import { PageHeader } from "@/components/layout/page-header";
import { NftMatchCardsGrid } from "@/components/nft/nft-match-cards-grid";

export default function NftMatchCardsPage() {
  return (
    <div className="editorial-stack w-full">
      <PageHeader
        eyebrow="Collectibles"
        title="NFT Match Cards"
        description="Own historical live match moments minted from explosive pulse intervals."
      />
      <div className="content-pad w-full">
        <NftMatchCardsGrid />
      </div>
    </div>
  );
}