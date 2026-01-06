/**
 * API 代码生成器
 * 从 Swagger/OpenAPI 文件生成 TypeScript API 代码
 *
 * 使用方法:
 *   pnpm api:generate --input <swagger目录> --output <输出目录>
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

// ============== 类型定义 ==============

interface SwaggerDefinition {
  type?: string;
  properties?: Record<string, unknown>;
  items?: unknown;
  $ref?: string;
  title?: string;
  description?: string;
  required?: string[];
  additionalProperties?: unknown;
  [key: string]: unknown;
}

interface SwaggerParameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  type?: string;
  format?: string;
  schema?: unknown;
}

interface OpenAPI3Parameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  schema: {
    type: string;
    format?: string;
    items?: { type: string };
  };
}

interface SwaggerResponse {
  description: string;
  schema?: {
    $ref?: string;
    [key: string]: unknown;
  };
}

interface SwaggerOperation {
  summary?: string;
  description?: string;
  operationId?: string;
  tags?: string[];
  parameters?: SwaggerParameter[];
  responses?: Record<string, SwaggerResponse>;
  consumes?: string[];
  produces?: string[];
}

interface SwaggerPath {
  get?: SwaggerOperation;
  post?: SwaggerOperation;
  put?: SwaggerOperation;
  delete?: SwaggerOperation;
  patch?: SwaggerOperation;
}

interface SwaggerTag {
  name: string;
  description?: string;
}

interface SwaggerDoc {
  swagger?: string;
  openapi?: string;
  info?: {
    title: string;
    version: string;
    description?: string;
  };
  tags?: SwaggerTag[];
  paths?: Record<string, SwaggerPath>;
  definitions?: Record<string, SwaggerDefinition>;
  components?: {
    schemas?: Record<string, SwaggerDefinition>;
  };
  consumes?: string[];
  produces?: string[];
}

interface GeneratorConfig {
  inputDir: string;
  outputDir: string;
  tempDir: string;
}

// ============== 常量 ==============

/**
 * 需要过滤掉的无用类型定义（原始名称，包含命名空间）
 * 这些类型在清理命名空间后也会被过滤
 */
const EXCLUDED_DEFINITIONS_ORIGINAL = new Set([
  'protobufAny',
  'rpcStatus',
  'google.protobuf.Any',
  'google.rpc.Status',
]);

/**
 * 清理后需要过滤的类型名称
 */
const EXCLUDED_DEFINITIONS_CLEAN = new Set(['Any', 'Status']);

// ============== 工具函数 ==============

/**
 * 清理定义名称，移除命名空间前缀
 * 例如: admin.v1.CreateSysAdminReply -> CreateSysAdminReply
 * 或者: v1CreateSysAdminReply -> CreateSysAdminReply
 */
function cleanDefinitionName(name: string): string {
  // 处理点号分隔的命名空间 (如 admin.v1.CreateSysAdminReply)
  if (name.includes('.')) {
    const parts = name.split('.');
    return parts[parts.length - 1] || name;
  }
  // 处理驼峰式前缀 (如 v1CreateSysAdminReply)
  if (name.startsWith('v1')) {
    return name.slice(2);
  }
  return name;
}

/**
 * 将 Swagger 2.0 参数转换为 OpenAPI 3.0 格式
 */
function convertParameter(param: SwaggerParameter): OpenAPI3Parameter | null {
  if (param.name === 'Authorization' && param.in === 'header') {
    return null;
  }
  if (param.in === 'body') {
    return null;
  }

  const paramType = param.type || 'string';
  const schema: { type: string; format?: string; items?: { type: string } } = {
    type: paramType,
  };

  if (param.format) {
    schema.format = param.format;
  }

  if (paramType === 'array') {
    schema.items = { type: 'string' };
  }

  return {
    name: param.name,
    in: param.in,
    description: param.description,
    required: param.required,
    schema,
  };
}

/**
 * 转换 $ref 引用格式，同时移除 v1 前缀
 */
function convertRef(obj: unknown): unknown {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(convertRef);
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (key === '$ref' && typeof value === 'string') {
      // 例如: #/definitions/admin.v1.CreateSysAdminReply -> #/components/schemas/CreateSysAdminReply
      let refValue = value.replace('#/definitions/', '');
      const cleanName = cleanDefinitionName(refValue);
      result[key] = `#/components/schemas/${cleanName}`;
    } else {
      result[key] = convertRef(value);
    }
  }
  return result;
}

/**
 * 处理属性，将 title 转为 description，确保数组有 items
 * 注意：此函数在 convertRef 之后调用，不要重复调用 convertRef
 */
function processProperty(prop: SwaggerDefinition): SwaggerDefinition {
  const result = { ...prop };

  // 将 title 转为 description（用于生成注释）
  if (result.title && !result.description) {
    result.description = result.title;
  }

  // 确保数组类型有 items
  if (result.type === 'array' && !result.items) {
    result.items = { type: 'string' };
  }

  return result;
}

/**
 * 转换 definition，处理所有属性
 */
function convertDefinition(def: SwaggerDefinition): SwaggerDefinition {
  // 先处理 $ref 引用
  const converted = convertRef(def) as SwaggerDefinition;

  // 将 title 转为 description（用于生成类型注释）
  if (converted.title && !converted.description) {
    converted.description = converted.title;
  }

  if (converted.type === 'array' && !converted.items) {
    converted.items = { type: 'string' };
  }

  // 处理属性
  if (converted.properties) {
    const processedProperties: Record<string, SwaggerDefinition> = {};
    for (const [propName, propValue] of Object.entries(converted.properties)) {
      if (propValue && typeof propValue === 'object') {
        processedProperties[propName] = processProperty(propValue as SwaggerDefinition);
      } else {
        processedProperties[propName] = propValue as SwaggerDefinition;
      }
    }
    converted.properties = processedProperties;
  }

  return converted;
}

/**
 * 将单个 Swagger 文件转换为 OpenAPI 3.0
 */
function convertSwaggerFile(filePath: string): Record<string, unknown> | null {
  const content = fs.readFileSync(filePath, 'utf-8');

  let doc: SwaggerDoc;
  try {
    doc = JSON.parse(content);
  } catch {
    console.error(`Error parsing ${filePath}`);
    return null;
  }

  const fileName = path.basename(filePath, '.swagger.json');

  const openapi: Record<string, unknown> = {
    openapi: '3.0.3',
    info: {
      title: doc.info?.title || fileName,
      version: '1.0.0',
      description: doc.info?.description || '',
    },
    servers: [{ url: '/api', description: 'API Server' }],
    tags: doc.tags || [],
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  };

  // 转换 paths
  if (doc.paths) {
    const paths: Record<string, Record<string, unknown>> = {};

    for (const [pathKey, pathValue] of Object.entries(doc.paths)) {
      paths[pathKey] = {};

      for (const [method, operation] of Object.entries(pathValue)) {
        if (!operation || typeof operation !== 'object') continue;

        const op = operation as SwaggerOperation;
        const convertedOp: Record<string, unknown> = {
          summary: op.summary,
          description: op.description,
          operationId: op.operationId,
          tags: op.tags,
        };

        const convertedParams: OpenAPI3Parameter[] = [];
        let requestBody: Record<string, unknown> | null = null;

        if (op.parameters) {
          for (const param of op.parameters) {
            if (param.in === 'body' && param.schema) {
              requestBody = {
                required: param.required,
                content: {
                  'application/json': {
                    schema: convertRef(param.schema),
                  },
                },
              };
            } else {
              const converted = convertParameter(param);
              if (converted) {
                convertedParams.push(converted);
              }
            }
          }
        }

        if (convertedParams.length > 0) {
          convertedOp.parameters = convertedParams;
        }

        if (requestBody) {
          convertedOp.requestBody = requestBody;
        }

        if (op.responses) {
          const convertedResponses: Record<string, unknown> = {};
          for (const [code, response] of Object.entries(op.responses)) {
            // 跳过 default 错误响应
            if (code === 'default') {
              continue;
            }
            convertedResponses[code] = {
              description: response.description,
              ...(response.schema && {
                content: {
                  'application/json': {
                    schema: convertRef(response.schema),
                  },
                },
              }),
            };
          }
          convertedOp.responses = convertedResponses;
        }

        paths[pathKey][method] = convertedOp;
      }
    }

    openapi.paths = paths;
  }

  // 转换 definitions（过滤掉无用的通用类型，清理命名空间前缀）
  if (doc.definitions) {
    const schemas: Record<string, SwaggerDefinition> = {};
    for (const [defName, defValue] of Object.entries(doc.definitions)) {
      // 过滤原始名称
      if (EXCLUDED_DEFINITIONS_ORIGINAL.has(defName)) {
        continue;
      }
      const cleanName = cleanDefinitionName(defName);
      // 过滤清理后的名称
      if (EXCLUDED_DEFINITIONS_CLEAN.has(cleanName)) {
        continue;
      }
      schemas[cleanName] = convertDefinition(defValue);
    }
    (openapi.components as Record<string, unknown>).schemas = schemas;
  }

  return openapi;
}

/**
 * 递归查找所有 swagger.json 文件
 */
function findSwaggerFiles(dir: string, baseDir: string): Array<{ file: string; relativePath: string }> {
  const results: Array<{ file: string; relativePath: string }> = [];

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...findSwaggerFiles(fullPath, baseDir));
    } else if (item.endsWith('.swagger.json')) {
      const relativePath = path.relative(baseDir, dir);
      results.push({ file: fullPath, relativePath });
    }
  }

  return results;
}

/**
 * 生成 orval 配置
 */
function generateOrvalConfig(
  swaggerFiles: Array<{ file: string; relativePath: string }>,
  config: GeneratorConfig,
): string {
  const configs: string[] = [];

  for (const { file, relativePath } of swaggerFiles) {
    const baseName = path.basename(file, '.swagger.json');
    // 转换文件名: ai_audio_record -> aiAudioRecord
    const configName = baseName.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    // 输出文件名: ai_audio_record -> ai-audio-record
    const outputName = baseName.replace(/_/g, '-');
    // 输出目录路径
    const outputSubDir = relativePath ? `${relativePath}/` : '';

    configs.push(`  ${configName}: {
    input: {
      target: '${config.tempDir}/${relativePath ? relativePath + '/' : ''}${baseName}.json',
    },
    output: {
      mode: 'single',
      target: '${config.outputDir}/${outputSubDir}${outputName}.ts',
      client: 'axios-functions',
      override: {
        mutator: {
          path: '${config.outputDir}/custom-instance.ts',
          name: 'customInstance',
        },
        useTypeOverInterfaces: false,
      },
      headers: true,
      prettier: true,
      allParamsOptional: false,
    },
  }`);
  }

  return `import { defineConfig } from 'orval';

export default defineConfig({
${configs.join(',\n')}
});
`;
}

/**
 * 生成导出索引文件
 */
function generateIndexFile(
  swaggerFiles: Array<{ file: string; relativePath: string }>,
  subDir: string,
): string {
  const exports: string[] = [];
  const subDirs = new Set<string>();

  for (const { file, relativePath } of swaggerFiles) {
    if (relativePath === subDir) {
      const baseName = path.basename(file, '.swagger.json');
      const outputName = baseName.replace(/_/g, '-');
      exports.push(`export * from './${outputName}';`);
    } else if (relativePath.startsWith(subDir ? subDir + '/' : '')) {
      // 获取下一级子目录
      const remaining = subDir ? relativePath.slice(subDir.length + 1) : relativePath;
      const nextDir = remaining.split('/')[0];
      if (nextDir) {
        subDirs.add(nextDir);
      }
    }
  }

  // 添加子目录的导出
  for (const dir of subDirs) {
    exports.push(`export * from './${dir}';`);
  }

  return `/**
 * API 自动生成模块
 * ⚠️ 此目录下的代码由 api-generator 自动生成，请勿手动修改
 */

${exports.sort().join('\n')}
`;
}

/**
 * 从文件名获取模块前缀
 * 例如: ai-audio-record.ts -> aiAudioRecord
 */
function getModulePrefix(fileName: string): string {
  const baseName = fileName.replace('.ts', '');
  // ai-audio-record -> aiAudioRecord
  return baseName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * 首字母大写
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 首字母小写
 */
function uncapitalize(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * 后处理：修复命名并移除无用类型
 */
function postProcessFiles(outputDir: string): void {
  const processDir = (dir: string) => {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        processDir(fullPath);
      } else if (item.endsWith('.ts') && item !== 'custom-instance.ts' && item !== 'index.ts') {
        let content = fs.readFileSync(fullPath, 'utf-8');

        // 获取模块前缀
        const prefix = getModulePrefix(item);
        const prefixCapitalized = capitalize(prefix);

        // 1. 修复方法名：移除模块前缀
        // 例如: aiAudioRecordDeleteAiAudioRecord -> deleteAiAudioRecord
        // 匹配模式: export const {prefix}{Method} = (
        const methodPattern = new RegExp(
          `export const ${prefix}([A-Z][a-zA-Z0-9]*)`,
          'g'
        );
        content = content.replace(methodPattern, (_, methodName) => {
          return `export const ${uncapitalize(methodName)}`;
        });

        // 2. 修复 GET 参数类型名：...Params -> ...Req
        // 例如: AiAudioRecordGetAiAudioRecordListParams -> GetAiAudioRecordListReq
        // 先收集所有需要替换的类型名
        const paramsTypePattern = new RegExp(
          `${prefixCapitalized}([A-Z][a-zA-Z0-9]*)Params`,
          'g'
        );

        // 收集所有匹配并创建替换映射
        const replacements: Array<{ from: string; to: string }> = [];
        let match;
        while ((match = paramsTypePattern.exec(content)) !== null) {
          const methodPart = match[1]; // 例如: GetAiAudioRecordList
          const oldName = `${prefixCapitalized}${methodPart}Params`;
          const newName = `${methodPart}Req`;
          if (!replacements.find(r => r.from === oldName)) {
            replacements.push({ from: oldName, to: newName });
          }
        }

        // 执行替换
        for (const { from, to } of replacements) {
          content = content.split(from).join(to);
        }

        // 3. 移除空接口中的 [key: string]: unknown; 索引签名
        // 将 { [key: string]: unknown; } 替换为 {}
        content = content.replace(
          /\{\n\s*\[key: string\]: unknown;\n\}/g,
          '{}'
        );

        // 4. 移除 AwaitedInput 和 Awaited 类型定义及后续的 Result 类型
        content = content.replace(/\n*type AwaitedInput<T>[\s\S]*$/, '\n');

        fs.writeFileSync(fullPath, content);
      }
    }
  };

  processDir(outputDir);
}

/**
 * 确保 custom-instance.ts 存在
 */
function ensureCustomInstance(outputDir: string): void {
  const customInstancePath = path.join(outputDir, 'custom-instance.ts');
  if (!fs.existsSync(customInstancePath)) {
    const content = `/**
 * 自定义 HTTP 实例适配器
 * 用于将 orval 生成的代码适配到项目现有的 requestClient
 */
import type { AxiosRequestConfig } from 'axios';

import { requestClient } from '../request';

/**
 * 自定义请求实例
 * orval 生成的代码会调用此函数发起请求
 */
export const customInstance = async <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const { url, method, params, data, headers, ...rest } = config;

  const requestConfig = {
    ...rest,
    headers,
    params,
  };

  switch (method?.toUpperCase()) {
    case 'GET': {
      return requestClient.get<T>(url!, requestConfig);
    }
    case 'POST': {
      return requestClient.post<T>(url!, data, requestConfig);
    }
    case 'PUT': {
      return requestClient.put<T>(url!, data, requestConfig);
    }
    case 'DELETE': {
      return requestClient.delete<T>(url!, requestConfig);
    }
    case 'PATCH': {
      return requestClient.patch<T>(url!, data, requestConfig);
    }
    default: {
      return requestClient.get<T>(url!, requestConfig);
    }
  }
};

export default customInstance;
`;
    fs.writeFileSync(customInstancePath, content);
    console.log('✅ Created custom-instance.ts');
  }
}

/**
 * 生成所有目录的索引文件
 */
function generateAllIndexFiles(
  swaggerFiles: Array<{ file: string; relativePath: string }>,
  outputDir: string,
): void {
  // 收集所有需要生成 index.ts 的目录
  const dirs = new Set<string>();
  dirs.add(''); // 根目录

  for (const { relativePath } of swaggerFiles) {
    if (relativePath) {
      const parts = relativePath.split('/');
      let current = '';
      for (const part of parts) {
        current = current ? `${current}/${part}` : part;
        dirs.add(current);
      }
    }
  }

  // 为每个目录生成 index.ts
  for (const dir of dirs) {
    const indexContent = generateIndexFile(swaggerFiles, dir);
    const indexPath = path.join(outputDir, dir, 'index.ts');
    fs.writeFileSync(indexPath, indexContent);
  }
}

// ============== 主函数 ==============

export function generate(inputDir: string, outputDir: string): void {
  const tempDir = path.join(process.cwd(), '.temp-swagger');

  const config: GeneratorConfig = {
    inputDir: path.resolve(inputDir),
    outputDir: path.resolve(outputDir),
    tempDir,
  };

  console.log('🔄 API Generator starting...');
  console.log(`   Input:  ${config.inputDir}`);
  console.log(`   Output: ${config.outputDir}`);

  // 创建临时目录
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  // 查找所有 swagger 文件
  const swaggerFiles = findSwaggerFiles(config.inputDir, config.inputDir);
  console.log(`\n📁 Found ${swaggerFiles.length} swagger files`);

  if (swaggerFiles.length === 0) {
    console.log('No swagger files found. Exiting.');
    return;
  }

  // 转换每个 swagger 文件
  console.log('🔄 Converting swagger files to OpenAPI 3.0...');
  for (const { file, relativePath } of swaggerFiles) {
    const baseName = path.basename(file, '.swagger.json');
    const openapi = convertSwaggerFile(file);

    if (openapi) {
      const tempSubDir = path.join(tempDir, relativePath);
      if (!fs.existsSync(tempSubDir)) {
        fs.mkdirSync(tempSubDir, { recursive: true });
      }
      const outputPath = path.join(tempSubDir, `${baseName}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(openapi, null, 2));
    }
  }

  // 清理输出目录（保留 custom-instance.ts）
  if (fs.existsSync(config.outputDir)) {
    const cleanDir = (dir: string) => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        if (item === 'custom-instance.ts') {
          continue; // 保留
        }
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          fs.rmSync(fullPath, { recursive: true });
        } else {
          fs.unlinkSync(fullPath);
        }
      }
    };
    cleanDir(config.outputDir);
    console.log('✅ Cleaned output directory');
  } else {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // 创建输出子目录
  const subDirs = new Set<string>();
  for (const { relativePath } of swaggerFiles) {
    if (relativePath) {
      subDirs.add(relativePath);
    }
  }
  for (const dir of subDirs) {
    const fullDir = path.join(config.outputDir, dir);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }
  }

  // 确保 custom-instance.ts 存在
  ensureCustomInstance(config.outputDir);

  // 生成 orval 配置
  const orvalConfig = generateOrvalConfig(swaggerFiles, config);
  const orvalConfigPath = path.join(process.cwd(), 'orval.config.ts');
  fs.writeFileSync(orvalConfigPath, orvalConfig);
  console.log('✅ Generated orval.config.ts');

  // 运行 orval
  console.log('🔄 Running orval...');
  try {
    execSync('npx orval', {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Error running orval:', error);
    process.exit(1);
  }

  // 后处理：移除无用的辅助类型
  console.log('🔄 Post-processing: removing unused helper types...');
  postProcessFiles(config.outputDir);
  console.log('✅ Removed unused helper types');

  // 生成所有索引文件
  generateAllIndexFiles(swaggerFiles, config.outputDir);
  console.log('✅ Generated index files');

  // 清理临时目录
  fs.rmSync(tempDir, { recursive: true });
  // 清理 orval 配置文件
  fs.unlinkSync(orvalConfigPath);
  console.log('✅ Cleaned up temp files');

  console.log(`\n🎉 Generated ${swaggerFiles.length} API files!`);
}

// CLI 入口
function main(): void {
  const args = process.argv.slice(2);

  let inputDir = '';
  let outputDir = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' || args[i] === '-i') {
      inputDir = args[i + 1] || '';
      i++;
    } else if (args[i] === '--output' || args[i] === '-o') {
      outputDir = args[i + 1] || '';
      i++;
    }
  }

  if (!inputDir || !outputDir) {
    console.log(`
Usage: api-generator --input <swagger_dir> --output <output_dir>

Options:
  -i, --input   Swagger 文件所在目录
  -o, --output  生成的 API 代码输出目录

Example:
  api-generator --input ../backend/doc/swagger --output ./src/api/generated
`);
    process.exit(1);
  }

  generate(inputDir, outputDir);
}

main();
