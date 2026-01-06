package service

import (
	"context"
	"sort"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/constant"
	"github.com/fzf-labs/kratos-contrib/meta"
	"github.com/samber/lo"
)

// GetSysNotifyMessageMyUnreadList 系统-通知消息-我的-未读列表
func (a *AdminV1SysNotifyMessageService) GetSysNotifyMessageMyUnreadList(ctx context.Context, req *pb.GetSysNotifyMessageMyUnreadListReq) (*pb.GetSysNotifyMessageMyUnreadListReply, error) {
	resp := &pb.GetSysNotifyMessageMyUnreadListReply{
		List: make([]*pb.SysNotifyMessageInfo, 0),
	}
	adminId := meta.GetMetadataFromClient(ctx, constant.XMdAdminId)
	list, err := a.sysNotifyMessageRepo.FindMultiCacheByReceiverReadTime(ctx, adminId, "")
	if err != nil {
		return nil, pb.ErrorReasonDataSQLError(pb.WithError(err))
	}
	if len(list) == 0 {
		return resp, nil
	}
	// 发送时间排序
	sort.Slice(list, func(i, j int) bool {
		return list[i].SendTime > list[j].SendTime
	})
	if len(list) > 0 {
		adminIds := make([]string, 0)
		adminIdToNickname := make(map[string]string)
		adminIdToAvatar := make(map[string]string)
		for _, v := range list {
			adminIds = append(adminIds, v.Receiver, v.Sender)
		}
		adminIds = lo.Uniq(adminIds)
		admins, err := a.sysAdminRepo.FindMultiCacheByIDS(ctx, adminIds)
		if err != nil {
			return nil, pb.ErrorReasonDataSQLError(pb.WithError(err))
		}
		for _, v := range admins {
			adminIdToNickname[v.ID] = v.Nickname
			adminIdToAvatar[v.ID] = v.Avatar
		}
		for _, v := range list {
			resp.List = append(resp.List, &pb.SysNotifyMessageInfo{
				Id:             v.ID,
				TenantId:       v.TenantID,
				Type:           v.Type,
				Subject:        v.Subject,
				Content:        v.Content,
				Sender:         v.Sender,
				Receiver:       v.Receiver,
				SendTime:       v.SendTime,
				ReadTime:       v.ReadTime,
				Extend:         v.Extend.String(),
				SenderName:     adminIdToNickname[v.Sender],
				SenderAvatar:   adminIdToAvatar[v.Sender],
				ReceiverName:   adminIdToNickname[v.Receiver],
				ReceiverAvatar: adminIdToAvatar[v.Receiver],
			})
		}
	}
	return resp, nil
}
