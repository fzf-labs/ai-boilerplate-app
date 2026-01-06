package data

import (
	"context"

	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/gorm/ai_boilerplate_repo"
	"github.com/go-kratos/kratos/v2/log"
	"github.com/samber/lo"
)

func NewSysPostRepo(
	logger log.Logger,
	data *Data,
	sysPostRepo *ai_boilerplate_repo.SysPostRepo,
) *SysPostRepo {
	l := log.NewHelper(log.With(logger, "module", "data/sysPost"))
	return &SysPostRepo{
		log:         l,
		data:        data,
		SysPostRepo: sysPostRepo,
	}
}

type SysPostRepo struct {
	log  *log.Helper
	data *Data
	*ai_boilerplate_repo.SysPostRepo
}

func (r *SysPostRepo) PostIdToName(ctx context.Context, postIds []string) (map[string]string, error) {
	postIds = lo.Filter(postIds, func(item string, _ int) bool {
		return item != ""
	})
	postIds = lo.Uniq(postIds)
	if len(postIds) == 0 {
		return map[string]string{}, nil
	}
	postMap, err := r.SysPostRepo.FindMultiCacheByIDS(ctx, postIds)
	if err != nil {
		return nil, err
	}
	postNameMap := make(map[string]string)
	for _, post := range postMap {
		postNameMap[post.ID] = post.Name
	}
	return postNameMap, nil
}
