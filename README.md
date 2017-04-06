# Gifted ListView

A new InfiniteList for react-native 0.43+ that compose react-virtualized/InfiniteLoader with the new react-native/VirtualizedList component, and a drop replacement component of react-native-gifted-listview



### Changelog
#### 0.1.5
- Pull-to-refresh
#### 0.1.4
- react-native 0.43.0+
#### 0.1.0
- the first version



### GiftedListView Simple example

below code was take from react-native-gifted-listview
just replace one line

```js
var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;


// var GiftedListView = require('react-native-gifted-listview');
import { GiftedListView } from 'react-native-infinite-virtualized-list'

var Example = React.createClass({

  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = 1, callback, options) {
    setTimeout(() => {
      var rows = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
      if (page === 3) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(rows);
      }
    }, 1000); // simulating network fetching
  },


  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  _onPress(rowData) {
    console.log(rowData+' pressed');
  },

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor='#c8c7cc'
        onPress={() => this._onPress(rowData)}
      >
        <Text>{rowData}</Text>
      </TouchableHighlight>
    );
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar} />
        <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          withSections={false} // enable sections
          customStyles={{
            paginationView: {
              backgroundColor: '#eee',
            },
          }}

          refreshableTintColor="blue"
          keyExtractor={(item, index) => index} // you need this for VirtualizedList
        />
      </View>
    );
  }
});

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#CCC'
  },
  row: {
    padding: 10,
    height: 44,
  },
};
```


### InfiniteVirtualizedList Advanced example

[See src/GiftedVirtualizedList.js](src/GiftedVirtualizedList.js)


### Installation

```npm install react-native-infinite-virtualized-list --save```


### Features
- [x] Pull-to-refresh
- [x] Infinite scrolling
- [x] Loader for first display
- [x] Default view when no content to display
- [x] Customizable (see advanced example)



### License

[MIT](LICENSE.md)
