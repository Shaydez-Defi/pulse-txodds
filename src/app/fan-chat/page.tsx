import { PageHeader } from "@/components/layout/page-header";
import { FanChatPlaceholder } from "@/components/chat/fan-chat-placeholder";

export default function FanChatPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="Community"
          title="Fan Chat"
          description="Live match conversation — interface ready, backend coming soon."
        />
        <FanChatPlaceholder />
      </div>
    </section>
  );
}