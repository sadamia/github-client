import { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { LoadingContainer } from "./LoadingContainer";

export default function InfinitePagination({
  hasNextPage,
  items,
  loadNextPage,
  RowTemplate,
  isNextPageLoading,
}: {
  hasNextPage: boolean;
  items: any;
  loadNextPage: () => void;
  RowTemplate: any;
  isNextPageLoading: boolean;
}) {
  // const isItemLoaded = (index: number): boolean => index < items.length;
  const isItemLoaded = index => !hasNextPage || index < items.length;


  const Item = ({ index, style }: { index: number; style: CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style}>
          <LoadingContainer repeat={1} />{index}{items.length}
        </div>
      );
    }
    const edge = items && items[index];

    return <RowTemplate edge={edge} index={index} style={style} />;
  };

  if (!items) {
    return <p>No data</p>;
  }
  const loadMoreItems = isNextPageLoading ? () => void 0 : loadNextPage;

  const itemsCount = hasNextPage ? items.length + 1 : items.length;

  return (
    <div data-testid="infinite-pagination">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemsCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            width={"100%"}
            height={450}
            itemSize={54}
            itemCount={itemsCount}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
}
