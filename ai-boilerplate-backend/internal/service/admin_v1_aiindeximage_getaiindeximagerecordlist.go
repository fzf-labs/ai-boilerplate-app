package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
)

// GetAiIndexImageRecordList AI 绘画表-列表数据查询
func (a *AdminV1AiIndexImageService) GetAiIndexImageRecordList(ctx context.Context, req *pb.GetAiIndexImageRecordListReq) (*pb.GetAiIndexImageRecordListReply, error) {
	resp := &pb.GetAiIndexImageRecordListReply{}
	// TODO
	return resp, nil
}
