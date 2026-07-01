import { PageHeader } from "@/components/layout/page-header";
import { NftMatchCardsGrid } from "@/components/nft/nft-match-cards-grid";

export default function NftMatchCardsPage() {
  return (
    <section className="pulse-page-bg pulse-page">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Collectibles"
          title="NFT Match Cards"
          description="Own historical live match moments. Mint cards dynamically generated from explosive pulse intervals."
        />

        <NftMatchCardsGrid />
      </div>
    </section>
  );
}