package data

import (
	"context"

	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/gorm/ai_boilerplate_repo"
	"github.com/go-kratos/kratos/v2/log"
	"github.com/samber/lo"
)

func NewSysDeptRepo(
	logger log.Logger,
	data *Data,
	sysDeptRepo *ai_boilerplate_repo.SysDeptRepo,
) *SysDeptRepo {
	l := log.NewHelper(log.With(logger, "module", "data/sysDept"))
	return &SysDeptRepo{
		log:         l,
		data:        data,
		SysDeptRepo: sysDeptRepo,
	}
}

type SysDeptRepo struct {
	log  *log.Helper
	data *Data
	*ai_boilerplate_repo.SysDeptRepo
}

// DeptIdToName 根据deptId获取deptName
func (r *SysDeptRepo) DeptIdToName(ctx context.Context, deptIds []string) (map[string]string, error) {
	deptIds = lo.Filter(deptIds, func(item string, _ int) bool {
		return item != ""
	})
	deptIds = lo.Uniq(deptIds)
	if len(deptIds) == 0 {
		return map[string]string{}, nil
	}
	deptMap, err := r.SysDeptRepo.FindMultiCacheByIDS(ctx, deptIds)
	if err != nil {
		return nil, err
	}
	deptNameMap := make(map[string]string)
	for _, dept := range deptMap {
		deptNameMap[dept.ID] = dept.Name
	}
	return deptNameMap, nil
}
