import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export default function InfinitePagination({
  hasNextPage,
  items,
  loadNextPage,
  RowTemplate,
  isNextPageLoading
}: { hasNextPage: boolean, items: any, loadNextPage: any, RowTemplate: any, isNextPageLoading: boolean }) {

  const isItemLoaded = (index: number): boolean => !hasNextPage || index < items.length;

  const Item = ({ index, style }: { index: number, style: any }) => {
    if (!isItemLoaded(index)) {
      return <p>Loading...</p>;
    }
    const edge = items && items[index];

    return <RowTemplate edge={edge} index={index} style={style} />;
  };


  if (!items) {
    return <p>No data</p>;
  }
  const loadMoreItems = isNextPageLoading ? () => void 0 : loadNextPage;

  const itemsCount = items.length;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemsCount}
      loadMoreItems={loadMoreItems}

    >
      {({ onItemsRendered, ref }) => (
        <List
          width={'100%'}
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
  );
}
