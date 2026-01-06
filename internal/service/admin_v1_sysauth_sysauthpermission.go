package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/constant"
	"github.com/fzf-labs/goutil/jsonutil"
	"github.com/fzf-labs/kratos-contrib/meta"
)

// SysAuthPermission Auth-获取权限
func (a *AdminV1SysAuthService) SysAuthPermission(ctx context.Context, req *pb.SysAuthPermissionReq) (*pb.SysAuthPermissionReply, error) {
	resp := &pb.SysAuthPermissionReply{
		Permission: []string{},
	}
	// 管理员 ID
	adminId := meta.GetMetadataFromClient(ctx, constant.XMdAdminId)
	// 查询管理员的角色
	admin, err := a.sysAdminRepo.FindOneCacheByID(ctx, adminId)
	if err != nil {
		return nil, pb.ErrorReasonDataSQLError(pb.WithError(err))
	}
	if admin == nil || admin.ID == "" {
		return nil, pb.ErrorReasonDataRecordNotFound()
	}
	// 查询管理员的角色
	role, err := a.sysRoleRepo.FindOneCacheByID(ctx, admin.RoleID)
	if err != nil {
		return nil, pb.ErrorReasonDataSQLError(pb.WithError(err))
	}
	if role == nil || role.ID == "" {
		return resp, nil
	}
	menuIds := make([]string, 0)
	if role.MenuIds.String() != "" {
		err := jsonutil.Unmarshal(role.MenuIds, &menuIds)
		if err != nil {
			return nil, pb.ErrorReasonDataFormattingError(pb.WithError(err))
		}
	}
	if len(menuIds) == 0 {
		return resp, nil
	}
	menus, err := a.sysMenuRepo.FindMultiCacheByIDS(ctx, menuIds)
	if err != nil {
		return nil, pb.ErrorReasonDataSQLError(pb.WithError(err))
	}
	permissions, err := a.sysMenuRepo.TraversePermissions(ctx, menus)
	if err != nil {
		return nil, pb.ErrorReasonDataSQLError(pb.WithError(err))
	}
	resp.Permission = permissions
	return resp, nil
}
