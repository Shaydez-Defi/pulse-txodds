import { PageHeader } from "@/components/layout/page-header";
import { FanChatPlaceholder } from "@/components/chat/fan-chat-placeholder";

export default function FanChatPage() {
  return (
    <div className="brutal-stack w-full">
      <PageHeader
        eyebrow="Community"
        title="Fan Chat"
        description="Live match conversation — interface ready, backend coming soon."
      />
      <FanChatPlaceholder />
    </div>
  );
}