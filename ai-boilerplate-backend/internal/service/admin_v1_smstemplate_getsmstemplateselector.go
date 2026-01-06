package service

import (
	"context"

	pb "github.com/fzf-labs/ai-boilerplate-backend/api/admin/v1"
)

// GetSmsTemplateSelector 短信模板-模板选择器
func (a *AdminV1SmsTemplateService) GetSmsTemplateSelector(ctx context.Context, req *pb.GetSmsTemplateSelectorReq) (*pb.GetSmsTemplateSelectorReply, error) {
	resp := &pb.GetSmsTemplateSelectorReply{}
	// TODO
	return resp, nil
}
