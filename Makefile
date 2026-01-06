# Subtree 配置列表（格式：名称|前缀|仓库|分支）
SUBTREES := \
	backend|ai-boilerplate-backend|git@github.com:fzf-labs/ai-boilerplate-backend.git|master \
	admin|ai-boilerplate-admin|git@github.com:fzf-labs/ai-boilerplate-admin.git|master \
	app|ai-boilerplate-app|git@github.com:fzf-labs/ai-boilerplate-app.git|master

# 颜色定义
COLOR_RESET := \033[0m
COLOR_GREEN := \033[32m
COLOR_YELLOW := \033[33m
COLOR_BLUE := \033[34m
COLOR_CYAN := \033[36m

# 辅助函数：从配置中提取字段
get-prefix = $(word 2,$(subst |, ,$(1)))
get-repo = $(word 3,$(subst |, ,$(1)))
get-branch = $(word 4,$(subst |, ,$(1)))
get-name = $(word 1,$(subst |, ,$(1)))

# 生成所有 subtree 名称列表
SUBTREE_NAMES := $(foreach st,$(SUBTREES),$(call get-name,$(st)))

# .PHONY 声明
.PHONY: help $(foreach name,$(SUBTREE_NAMES),subtree-pull-$(name) subtree-push-$(name) subtree-add-$(name) subtree-diff-$(name)) \
	subtree-pull-all subtree-push-all subtree-status subtree-check-dirty subtree-list

# 默认目标
.DEFAULT_GOAL := help

help:
	@echo "$(COLOR_CYAN)═══════════════════════════════════════════════════════════════$(COLOR_RESET)"
	@echo "$(COLOR_CYAN)  Git Subtree 管理工具$(COLOR_RESET)"
	@echo "$(COLOR_CYAN)═══════════════════════════════════════════════════════════════$(COLOR_RESET)"
	@echo ""
	@echo "$(COLOR_YELLOW)📥 拉取命令（从远程更新）：$(COLOR_RESET)"
	@$(foreach st,$(SUBTREES), \
		echo "  $(COLOR_GREEN)make subtree-pull-$(call get-name,$(st))$(COLOR_RESET)  - 更新 $(call get-prefix,$(st))";)
	@echo "  $(COLOR_GREEN)make subtree-pull-all$(COLOR_RESET)       - 更新所有 subtree"
	@echo ""
	@echo "$(COLOR_YELLOW)📤 推送命令（推送到远程）：$(COLOR_RESET)"
	@$(foreach st,$(SUBTREES), \
		echo "  $(COLOR_GREEN)make subtree-push-$(call get-name,$(st))$(COLOR_RESET)  - 推送 $(call get-prefix,$(st))";)
	@echo "  $(COLOR_GREEN)make subtree-push-all$(COLOR_RESET)       - 推送所有 subtree"
	@echo ""
	@echo "$(COLOR_YELLOW)🔍 查看命令：$(COLOR_RESET)"
	@echo "  $(COLOR_GREEN)make subtree-status$(COLOR_RESET)         - 查看所有 subtree 状态"
	@echo "  $(COLOR_GREEN)make subtree-list$(COLOR_RESET)           - 列出所有 subtree 配置"
	@echo "  $(COLOR_GREEN)make subtree-check-dirty$(COLOR_RESET)    - 检查是否有未提交的更改"
	@$(foreach st,$(SUBTREES), \
		echo "  $(COLOR_GREEN)make subtree-diff-$(call get-name,$(st))$(COLOR_RESET)   - 查看 $(call get-prefix,$(st)) 的差异";)
	@echo ""
	@echo "$(COLOR_YELLOW)➕ 添加命令（首次使用）：$(COLOR_RESET)"
	@$(foreach st,$(SUBTREES), \
		echo "  $(COLOR_GREEN)make subtree-add-$(call get-name,$(st))$(COLOR_RESET)    - 添加 $(call get-prefix,$(st))";)
	@echo ""

# 列出所有 subtree 配置
subtree-list:
	@echo "$(COLOR_CYAN)配置的 Subtree 列表：$(COLOR_RESET)"
	@echo ""
	@$(foreach st,$(SUBTREES), \
		echo "$(COLOR_YELLOW)● $(call get-name,$(st))$(COLOR_RESET)"; \
		echo "  前缀：  $(call get-prefix,$(st))"; \
		echo "  仓库：  $(call get-repo,$(st))"; \
		echo "  分支：  $(call get-branch,$(st))"; \
		echo "";)

# 检查是否有未提交的更改
subtree-check-dirty:
	@echo "$(COLOR_BLUE)检查工作区状态...$(COLOR_RESET)"
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "$(COLOR_YELLOW)⚠️  警告：工作区有未提交的更改$(COLOR_RESET)"; \
		git status --short; \
		exit 1; \
	else \
		echo "$(COLOR_GREEN)✓ 工作区干净$(COLOR_RESET)"; \
	fi

# 查看所有 subtree 状态
subtree-status:
	@echo "$(COLOR_CYAN)═══════════════════════════════════════════════════════════════$(COLOR_RESET)"
	@echo "$(COLOR_CYAN)  Subtree 状态$(COLOR_RESET)"
	@echo "$(COLOR_CYAN)═══════════════════════════════════════════════════════════════$(COLOR_RESET)"
	@echo ""
	@$(foreach st,$(SUBTREES), \
		echo "$(COLOR_YELLOW)● $(call get-prefix,$(st))$(COLOR_RESET)"; \
		echo "  最近提交："; \
		git log --oneline -1 --color=always -- $(call get-prefix,$(st))/ 2>/dev/null | sed 's/^/    /' || echo "    $(COLOR_YELLOW)未找到提交记录$(COLOR_RESET)"; \
		echo "  本地更改："; \
		if [ -n "$$(git status --short $(call get-prefix,$(st))/ 2>/dev/null)" ]; then \
			git status --short $(call get-prefix,$(st))/ | sed 's/^/    /'; \
		else \
			echo "    $(COLOR_GREEN)无更改$(COLOR_RESET)"; \
		fi; \
		echo "";)

# 动态生成 pull 目标
define make-pull-target
subtree-pull-$(call get-name,$(1)):
	@echo "$(COLOR_BLUE)正在更新 $(call get-prefix,$(1))...$(COLOR_RESET)"
	@git subtree pull --prefix=$(call get-prefix,$(1)) $(call get-repo,$(1)) $(call get-branch,$(1)) --squash
	@echo "$(COLOR_GREEN)✓ $(call get-prefix,$(1)) 更新完成$(COLOR_RESET)"
endef

# 动态生成 push 目标
define make-push-target
subtree-push-$(call get-name,$(1)):
	@echo "$(COLOR_BLUE)正在推送 $(call get-prefix,$(1))...$(COLOR_RESET)"
	@OUTPUT=$$$$(git subtree push --prefix=$(call get-prefix,$(1)) $(call get-repo,$(1)) $(call get-branch,$(1)) 2>&1); \
	EXIT_CODE=$$$$?; \
	echo "$$$$OUTPUT"; \
	if echo "$$$$OUTPUT" | grep -q "Everything up-to-date"; then \
		echo "$(COLOR_YELLOW)⚠️  $(call get-prefix,$(1)) 没有新内容需要推送$(COLOR_RESET)"; \
	elif [ $$$$EXIT_CODE -ne 0 ] && echo "$$$$OUTPUT" | grep -q "non-fast-forward\|rejected"; then \
		echo "$(COLOR_YELLOW)⚠️  $(call get-prefix,$(1)) 推送被拒绝：远程有新的提交$(COLOR_RESET)"; \
		echo "$(COLOR_YELLOW)   请先执行: make subtree-pull-$(call get-name,$(1))$(COLOR_RESET)"; \
		exit 1; \
	elif [ $$$$EXIT_CODE -eq 0 ]; then \
		echo "$(COLOR_GREEN)✓ $(call get-prefix,$(1)) 推送完成$(COLOR_RESET)"; \
	fi
endef

# 动态生成 add 目标
define make-add-target
subtree-add-$(call get-name,$(1)):
	@echo "$(COLOR_BLUE)正在添加 $(call get-prefix,$(1)) 为 subtree...$(COLOR_RESET)"
	@if [ -d "$(call get-prefix,$(1))" ]; then \
		echo "$(COLOR_YELLOW)⚠️  目录 $(call get-prefix,$(1)) 已存在，跳过添加$(COLOR_RESET)"; \
	else \
		git subtree add --prefix=$(call get-prefix,$(1)) $(call get-repo,$(1)) $(call get-branch,$(1)) --squash; \
		echo "$(COLOR_GREEN)✓ $(call get-prefix,$(1)) 添加完成$(COLOR_RESET)"; \
	fi
endef

# 动态生成 diff 目标
define make-diff-target
subtree-diff-$(call get-name,$(1)):
	@echo "$(COLOR_CYAN)$(call get-prefix,$(1)) 的差异：$(COLOR_RESET)"
	@git diff HEAD -- $(call get-prefix,$(1))/
endef

# 为每个 subtree 生成目标
$(foreach st,$(SUBTREES),$(eval $(call make-pull-target,$(st))))
$(foreach st,$(SUBTREES),$(eval $(call make-push-target,$(st))))
$(foreach st,$(SUBTREES),$(eval $(call make-add-target,$(st))))
$(foreach st,$(SUBTREES),$(eval $(call make-diff-target,$(st))))

# 添加所有 subtree
subtree-add-all: $(foreach name,$(SUBTREE_NAMES),subtree-add-$(name))
	@echo ""
	@echo "$(COLOR_GREEN)✓ 所有 subtree 添加完成$(COLOR_RESET)"

# 批量操作
subtree-pull-all: $(foreach name,$(SUBTREE_NAMES),subtree-pull-$(name))
	@echo ""
	@echo "$(COLOR_GREEN)✓ 所有 subtree 更新完成$(COLOR_RESET)"

# 推送所有 subtree 的更改到远程
subtree-push-all: $(foreach name,$(SUBTREE_NAMES),subtree-push-$(name))
	@echo ""
	@echo "$(COLOR_GREEN)✓ 所有 subtree 推送完成$(COLOR_RESET)"

# git 记录清除
git-clean:
	#清除开始
	@git checkout --orphan clean-branch
	@git add -A
	@git commit -am "clean"
	@git branch -D master
	@git branch -m master
	@git push -f origin master
	#清除结束