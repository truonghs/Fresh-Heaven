import {Text, View, TextInput, Pressable, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
import {Modal, SlideAnimation, ModalContent, ModalPortal} from 'react-native-modals';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import styles from './SortView.style';
function SortView({visible, setVisible, priceRange, setPriceRange, sortChoices, handleSortAdvanced, handleResetSort, handleApplySort}) {
  return (
    <>
      <Modal
        visible={visible}
        onTouchOutside={() => setVisible(false)}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'right',
          })
        }
        swipeDirection={['left', 'right']}
        onHardwareBackPress={() => setVisible(false)}
        onSwipeOut={() => setVisible(false)}
        style={styles.modalContainer}
      >
        <ModalContent style={styles.modal}>
          <ScrollView>
            <Text style={styles.sortTitle}>Search filter</Text>
            <View style={styles.sortCol}>
              <Text style={styles.sortType}>According to quality</Text>
              <View style={styles.sortRow}>
                <Pressable
                  style={[styles.sortOption, sortChoices['quality_standards']?.includes('Import') ? styles.sortActive : null]}
                  onPress={() => handleSortAdvanced('quality_standards', 'Import')}
                >
                  <Text style={styles.sortOptionText}>Import</Text>
                </Pressable>
                <Pressable
                  style={[styles.sortOption, sortChoices['quality_standards']?.includes('Domestic') ? styles.sortActive : null]}
                  onPress={() => handleSortAdvanced('quality_standards', 'Domestic')}
                >
                  <Text style={styles.sortOptionText}>Domestic</Text>
                </Pressable>
              </View>
              <View style={styles.sortRow}>
                <Pressable
                  style={[styles.sortOption, sortChoices['quality_standards']?.includes('Clean fruit') ? styles.sortActive : null]}
                  onPress={() => handleSortAdvanced('quality_standards', 'Clean fruit')}
                >
                  <Text style={styles.sortOptionText}>Clean fruit</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.sortCol}>
              <Text style={styles.sortType}>Production Site </Text>
              <View style={styles.sortRow}>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('China') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'China')}>
                  <Text style={styles.sortOptionText}>China</Text>
                </Pressable>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('VietNam') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'VietNam')}>
                  <Text style={styles.sortOptionText}>VietNam</Text>
                </Pressable>
              </View>
              <View style={styles.sortRow}>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('Korea') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'Korea')}>
                  <Text style={styles.sortOptionText}>Korea</Text>
                </Pressable>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('ThaiLand') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'ThaiLand')}>
                  <Text style={styles.sortOptionText}>ThaiLand</Text>
                </Pressable>
              </View>
              <View style={styles.sortRow}>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('Malaysia') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'Malaysia')}>
                  <Text style={styles.sortOptionText}>Malaysia</Text>
                </Pressable>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('Indonesia') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'Indonesia')}>
                  <Text style={styles.sortOptionText}>Indonesia</Text>
                </Pressable>
              </View>
              <View style={styles.sortRow}>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('New Zealand') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'New Zealand')}>
                  <Text style={styles.sortOptionText}>New Zealand</Text>
                </Pressable>
                <Pressable style={[styles.sortOption, sortChoices['origin']?.includes('America') ? styles.sortActive : null]} onPress={() => handleSortAdvanced('origin', 'America')}>
                  <Text style={styles.sortOptionText}>America</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.sortCol}>
              <Text style={styles.sortType}>Price range($) </Text>
              <View style={[styles.sortRow, {backgroundColor: '#f5f5f5', padding: 10}]}>
                <TextInput
                  value={priceRange.minPrice}
                  onChangeText={(value) => setPriceRange({...priceRange, minPrice: value})}
                  style={styles.inputField}
                  placeholder="Min price"
                  keyboardType="numeric"
                />
                <FontAwesome6 name="minus" size={24} color={'#d3d3d3'} />
                <TextInput
                  value={priceRange.maxPrice}
                  onChangeText={(value) => setPriceRange({...priceRange, maxPrice: value})}
                  style={styles.inputField}
                  placeholder="Max price"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable style={styles.button} onPress={handleResetSort}>
                <Text style={styles.buttonText}>Reset</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleApplySort}>
                <Text style={styles.buttonText}>Apply</Text>
              </Pressable>
            </View>
          </ScrollView>
        </ModalContent>
      </Modal>
    </>
  );
}
export default React.memo(SortView);
