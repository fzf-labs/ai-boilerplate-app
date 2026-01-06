package data

import (
	"context"
	"fmt"

	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/gorm/ai_boilerplate_repo"
	"github.com/fzf-labs/gopkg/jwt"
	"github.com/fzf-labs/goutil/cryptutil"
	"github.com/fzf-labs/goutil/uuidutil"
	"github.com/go-kratos/kratos/v2/log"
	"github.com/samber/lo"
)

func NewUserRepo(
	logger log.Logger,
	data *Data,
	userRepo *ai_boilerplate_repo.UserRepo,
) *UserRepo {
	l := log.NewHelper(log.With(logger, "module", "data/user"))
	jwt := jwt.NewJwt(&jwt.Config{
		AccessSecret: data.cfg.GetBusiness()["jwt"].GetFields()["parent"].GetStructValue().GetFields()["accessSecret"].GetStringValue(),
		AccessExpire: int64(data.cfg.GetBusiness()["jwt"].GetFields()["parent"].GetStructValue().GetFields()["accessExpire"].GetNumberValue()),
		RefreshAfter: int64(data.cfg.GetBusiness()["jwt"].GetFields()["parent"].GetStructValue().GetFields()["refreshAfter"].GetNumberValue()),
		Issuer:       data.cfg.GetBusiness()["jwt"].GetFields()["parent"].GetStructValue().GetFields()["issuer"].GetStringValue(),
	}, jwt.NewRueidisCache(data.rueidis))
	return &UserRepo{
		log:      l,
		data:     data,
		UserRepo: userRepo,
		jwt:      jwt,
	}
}

type UserRepo struct {
	log  *log.Helper
	data *Data
	jwt  *jwt.Jwt
	*ai_boilerplate_repo.UserRepo
}

// GenerateNicknameByPhone 手机尾号生成昵称
func (u *UserRepo) GenerateNicknameByPhone(phone string) string {
	return fmt.Sprintf("用户%s", phone[len(phone)-4:])
}

// GenerateSalt 生成 salt
func (u *UserRepo) GenerateSalt() string {
	return uuidutil.KSUIDByTime()
}

// GeneratePassword 生成 password
func (u *UserRepo) GeneratePassword(salt string, password string) (string, error) {
	password, err := cryptutil.Encrypt(salt + password)
	if err != nil {
		return "", err
	}
	return password, nil
}

// VerifyPassword 验证 password
func (u *UserRepo) VerifyPassword(salt string, password string, hash string) bool {
	return cryptutil.Compare(salt+password, hash) == nil
}

// GenerateToken 生成token
func (r *UserRepo) GenerateToken(ctx context.Context, userId string, wxGzhUserId string, wxGzhXcxId string) (*jwt.Token, error) {
	token, _, err := r.jwt.GenerateToken(map[string]any{
		"uid":         userId,
		"wxGzhUserId": wxGzhUserId,
		"wxGzhXcxId":  wxGzhXcxId,
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

// CheckToken 检查token
func (r *UserRepo) CheckToken(ctx context.Context, token string) (map[string]any, error) {
	claims, err := r.jwt.ParseToken(token)
	if err != nil {
		return nil, err
	}
	return claims, nil
}

// UserIdToNickname 根据userIds查询用户昵称
func (u *UserRepo) UserIdToNickname(ctx context.Context, userIds []string) (map[string]string, error) {
	resp := make(map[string]string)
	userIds = lo.Filter(userIds, func(item string, _ int) bool {
		return item != ""
	})
	userIds = lo.Uniq(userIds)
	if len(userIds) == 0 {
		return resp, nil
	}
	users, err := u.FindMultiCacheByIDS(ctx, userIds)
	if err != nil {
		return nil, err
	}
	for _, user := range users {
		resp[user.ID] = user.Nickname
	}
	return resp, nil
}
