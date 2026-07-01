import { PageHeader } from "@/components/layout/page-header";
import { NftMatchCardsGrid } from "@/components/nft/nft-match-cards-grid";

export default function NftMatchCardsPage() {
  return (
    <div className="brutal-stack w-full">
      <PageHeader
        eyebrow="Collectibles"
        title="NFT Match Cards"
        description="Own historical live match moments minted from explosive pulse intervals."
      />
      <NftMatchCardsGrid />
    </div>
  );
}