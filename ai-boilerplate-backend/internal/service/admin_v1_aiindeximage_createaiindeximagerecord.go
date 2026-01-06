package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
)

// CreateAiIndexImageRecord AI 绘画表-创建一条数据
func (a *AdminV1AiIndexImageService) CreateAiIndexImageRecord(ctx context.Context, req *pb.CreateAiIndexImageRecordReq) (*pb.CreateAiIndexImageRecordReply, error) {
	resp := &pb.CreateAiIndexImageRecordReply{}
	// TODO
	return resp, nil
}
