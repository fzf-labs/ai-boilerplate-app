package data

import (
	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/gorm/ai_boilerplate_repo"
	"github.com/go-kratos/kratos/v2/log"
)

func NewSelfAppReleaseRepo(
	logger log.Logger,
	data *Data,
	selfAppReleaseRepo *ai_boilerplate_repo.SelfAppReleaseRepo,
) *SelfAppReleaseRepo {
	l := log.NewHelper(log.With(logger, "module", "data/selfAppRelease"))
	return &SelfAppReleaseRepo{
		log:                l,
		data:               data,
		SelfAppReleaseRepo: selfAppReleaseRepo,
	}
}

type SelfAppReleaseRepo struct {
	log  *log.Helper
	data *Data
	*ai_boilerplate_repo.SelfAppReleaseRepo
}
