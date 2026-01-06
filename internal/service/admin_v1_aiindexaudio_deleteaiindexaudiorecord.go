package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
)

// DeleteAiIndexAudioRecord AI 音乐表-删除一条数据
func (a *AdminV1AiIndexAudioService) DeleteAiIndexAudioRecord(ctx context.Context, req *pb.DeleteAiIndexAudioRecordReq) (*pb.DeleteAiIndexAudioRecordReply, error) {
	resp := &pb.DeleteAiIndexAudioRecordReply{}
	// TODO
	return resp, nil
}
