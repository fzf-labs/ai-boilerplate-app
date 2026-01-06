package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
	"github.com/fzf-labs/ai-boilerplate-backend/internal/data/constant"
	"github.com/fzf-labs/godb/orm/condition"
	"github.com/fzf-labs/kratos-contrib/meta"
	"github.com/samber/lo"
)

// GetSysNotifyMessageList 系统-通知消息-列表数据查询
func (a *AdminV1SysNotifyMessageService) GetSysNotifyMessageList(ctx context.Context, req *pb.GetSysNotifyMessageListReq) (*pb.GetSysNotifyMessageListReply, error) {
	resp := &pb.GetSysNotifyMessageListReply{
		Total: 0,
		List:  []*pb.SysNotifyMessageInfo{},
	}
	tenantId := meta.GetMetadataFromClient(ctx, constant.XMdTenantId)
	param := &condition.Req{
		Page:     req.GetPage(),
		PageSize: req.GetPageSize(),
		Query: []*condition.QueryParam{
			{
				Field: "tenant_id",
				Value: tenantId,
				Exp:   condition.EQ,
				Logic: condition.AND,
			},
		},
		Order: []*condition.OrderParam{
			{
				Field: "send_time",
				Order: condition.DESC,
			},
		},
	}
	if req.GetReceiver() != "" {
		param.Query = append(param.Query, &condition.QueryParam{
			Field: "receiver",
			Value: req.GetReceiver(),
			Exp:   condition.EQ,
			Logic: condition.AND,
		})
	}
	if len(req.GetSendTime()) > 0 {
		param.Query = append(param.Query, &condition.QueryParam{
			Field: "send_time",
			Value: req.GetSendTime()[0],
			Exp:   condition.GTE,
			Logic: condition.AND,
		})
		param.Query = append(param.Query, &condition.QueryParam{
			Field: "send_time",
			Value: req.GetSendTime()[1],
			Exp:   condition.LTE,
			Logic: condition.AND,
		})
	}
	if req.GetReadStatus() == 1 {
		param.Query = append(param.Query, &condition.QueryParam{
			Field: "read_time",
			Value: "",
			Exp:   condition.NEQ,
			Logic: condition.AND,
		})
	}
	if req.GetReadStatus() == -1 {
		param.Query = append(param.Query, &condition.QueryParam{
			Field: "read_time",
			Value: "",
			Exp:   condition.EQ,
			Logic: condition.AND,
		})
	}
	list, p, err := a.sysNotifyMessageRepo.FindMultiCacheByCondition(ctx, param)
	if err != nil {
		return nil, pb.ErrorReasonDataSQLError(pb.WithError(err))
	}
	resp.Total = int32(p.Total)
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
				ReceiverName:   adminIdToNickname[v.Receiver],
				ReceiverAvatar: adminIdToAvatar[v.Receiver],
				SenderName:     adminIdToNickname[v.Sender],
				SenderAvatar:   adminIdToAvatar[v.Sender],
			})
		}
	}
	return resp, nil
}
