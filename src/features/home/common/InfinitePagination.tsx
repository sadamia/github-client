import { CSSProperties, Children } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { LoadingContainer } from "./LoadingContainer";

export default function InfinitePagination<T>({
  hasNextPage,
  items,
  loadNextPage,
  RowTemplate,
  isNextPageLoading,
}: {
  hasNextPage: boolean;
  items: T[];
  loadNextPage: () => void;
  RowTemplate: React.FC<{ edge: T; index: number; style: CSSProperties }>
  isNextPageLoading: boolean;
}) {
  const isItemLoaded = (index: number) => !hasNextPage || index < Children.count(items);

  const Item = ({ index, style }: { index: number; style: CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style}>
          <LoadingContainer repeat={1} />{index}{Children.count(items)}
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

  const itemsCount = hasNextPage ? Children.count(items) + 1 : Children.count(items);

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
