package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
)

// DeleteAiIndexVideoRecord AI 视频表-删除一条数据
func (a *AdminV1AiIndexVideoService) DeleteAiIndexVideoRecord(ctx context.Context, req *pb.DeleteAiIndexVideoRecordReq) (*pb.DeleteAiIndexVideoRecordReply, error) {
	resp := &pb.DeleteAiIndexVideoRecordReply{}
	// TODO
	return resp, nil
}
