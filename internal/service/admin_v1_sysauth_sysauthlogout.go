package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
)

// SysAuthLogout Auth-退出
func (a *AdminV1SysAuthService) SysAuthLogout(ctx context.Context, req *pb.SysAuthLogoutReq) (*pb.SysAuthLogoutReply, error) {
	resp := &pb.SysAuthLogoutReply{}
	// TODO
	return resp, nil
}
