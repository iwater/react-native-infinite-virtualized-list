import React, { PropTypes } from 'react'
import { VirtualizedList } from 'react-native'
import { InfiniteLoader } from 'react-virtualized/dist/commonjs/InfiniteLoader'

const noop = () => {}

export default class InfiniteVirtualizedList extends React.Component {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    isNextPageLoading: PropTypes.bool.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    paginationWaitingView: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  static defaultProps = {
    paginationWaitingView: noop,
  }

  render() {
    const { hasNextPage, isNextPageLoading, data, loadNextPage, renderItem, paginationWaitingView } = this.props
    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const rowCount = hasNextPage
      ? data.length + 1
      : data.length

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreRows = isNextPageLoading
      ? noop
      : loadNextPage

    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => !hasNextPage || index < data.length

    // Render a list item or a loading indicator.
    const rowRenderer = ({ item, index }) => {
      if (!isRowLoaded({ index })) {
        return paginationWaitingView()
      }
      return renderItem({ item, index })
    }

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <VirtualizedList
            onViewableItemsChanged={({ viewableItems }) => {
              if (viewableItems.length > 0) {
                onRowsRendered({
                  startIndex: viewableItems[0].index,
                  stopIndex: viewableItems[viewableItems.length - 1].index,
                })
              }
            }}
            ref={registerChild}
            renderItem={rowRenderer}
            {...this.props}
          />
      )}
      </InfiniteLoader>
    )
  }
}
