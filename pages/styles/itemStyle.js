import { StyleSheet } from 'react-native'

const itemStyle = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15
  },
  itemHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemFooter: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemType: {
    flexDirection: 'row',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  labelImage: {
    width: 15,
    height: 15
  },
  lbaelText: {
    fontSize: 13,
    color: '#abb4bf',
    marginLeft: 4
  }
})

export default itemStyle