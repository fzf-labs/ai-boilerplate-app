package data

import (
	"context"

	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/gorm/ai_boilerplate_repo"
	"github.com/go-kratos/kratos/v2/log"
	"github.com/samber/lo"
)

func NewSysRoleRepo(
	logger log.Logger,
	data *Data,
	sysRoleRepo *ai_boilerplate_repo.SysRoleRepo,
) *SysRoleRepo {
	l := log.NewHelper(log.With(logger, "module", "data/sysRole"))
	return &SysRoleRepo{
		log:         l,
		data:        data,
		SysRoleRepo: sysRoleRepo,
	}
}

type SysRoleRepo struct {
	log  *log.Helper
	data *Data
	*ai_boilerplate_repo.SysRoleRepo
}

func (r *SysRoleRepo) RoleIdToName(ctx context.Context, roleIds []string) (map[string]string, error) {
	roleIds = lo.Filter(roleIds, func(item string, _ int) bool {
		return item != ""
	})
	roleIds = lo.Uniq(roleIds)
	if len(roleIds) == 0 {
		return map[string]string{}, nil
	}
	roleMap, err := r.SysRoleRepo.FindMultiCacheByIDS(ctx, roleIds)
	if err != nil {
		return nil, err
	}
	roleNameMap := make(map[string]string)
	for _, role := range roleMap {
		roleNameMap[role.ID] = role.Name
	}
	return roleNameMap, nil
}
