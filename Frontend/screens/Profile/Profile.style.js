import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backGroundImage: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnEditProfile: {
    flex: 1,
    marginBottom: 10,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  userMemberShip: {
    width: 220,
  },
  userMemberShipRow: {
    flexDirection: 'row',
  },
  userMemberShipText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
    marginLeft: 8,
  },
  userInfoList: {
    width: '100%',
    paddingHorizontal: 30,
    marginVertical: 40,
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userInfoItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    color: '#000',
  },
  buttons: {
    // position:'absolute',
    // top:'66%',
    // left:'12%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
