import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'flex-end',
  },
  modal: {
    width: 380,
    height: '100%',
  },
  sortTitle: {
    backgroundColor: '#f5f5f5',
    fontSize: 24,
    fontWeight: '600',
    color: '#1f1f1f',
    textAlign: 'center',
    marginBottom: 10,
    padding: 10,
  },
  sortCol: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    marginBottom: 20,
  },
  sortType: {
    color: '#323232',
    fontSize: 20,
    marginBottom: 10,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortOption: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#f5f5f5',
  },
  sortOptionText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  sortActive: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  inputField: {
    backgroundColor: '#fff',
    fontSize: 16,
    textAlign: 'center',
    width: '45%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: '48%',
    padding: 12,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
export default styles;
