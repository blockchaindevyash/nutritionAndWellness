import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { hp, wp } from '../../components/responsive';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS, Fonts } from '../../utils';
import Header from '../../components/HeaderComponent';
import moment from 'moment';
import plane from '../../images/plane.png';
import plus from '../../images/plus.png';


const AIChatScreen = ({ navigation }) => {
  const orientation = useOrientation(); // Get current orientation
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const [enterText, setEnterText] = useState('');
  const [searchList, setSearchList] = useState([]);

  return (
    <View style={styles.safeAreaStyle}>
      <View style={[styles.container, { backgroundColor: COLORS.backColor }]}>
        <View style={styles.headerView}>
          <Header title={'AI Chat'} onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.mainView}>
          {searchList.length > 0 ? (
            <ScrollView contentContainerStyle={{ paddingBottom: hp(15) }}>
              {searchList.map((item, index) => {
                return (
                  <View style={styles.itemsDataView}>
                    {item.role == 'user' ? (
                      <View style={[styles.queDataMainView, { paddingTop: index == 0 ? hp(1) : hp(4) }]}>
                        <View style={styles.queDataView}>
                          {item.attachments.length > 0 && (
                            <View style={{ alignItems: 'flex-end' }}>
                              <Image source={{ uri: 'https://aiapi.medendx.com' + item.attachments[0].file }} style={styles.urlImage} />
                            </View>
                          )}
                          <Text style={styles.queText}>{item.content}</Text>
                        </View>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.ansTitleText}>{'AIHealthCare  '}
                          <Text style={styles.ansDateText}>{moment(item.created_at, "MM/DD/YY hh:mm:ss A").format('MMM DD, hh:mm a')}</Text>
                        </Text>
                        <Text style={styles.ansText}>{renderContent(item.content)}</Text>
                        {/* <Markdown style={{
                          body: styles.ansText,
                          heading1: [styles.ansText, {fontFamily: Fonts.FONTS.PoppinsSemiBold}],
                          code_block: styles.ansText
                        }}>
                          {item.content}
                        </Markdown> */}
                      </>
                    )}
                    {(answerLoading && index == searchList.length - 1) && (
                      <>
                        <Text style={styles.ansTitleText}>{'AIHealthCare '}</Text>
                        <Text style={[styles.ansText, { color: COLORS.greyColor }]}>{loadingCount == 1 ? 'Loading.' : loadingCount == 2 ? 'Loading. .' : 'Loading. . .'}</Text>
                      </>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View style={styles.emptyTextView}>
              <Text style={styles.emptyText}>selectTemplate dummy_name</Text>
              {/* <Text style={styles.chatText}>{selectTemplate?.description}</Text> */}
            </View>
          )}
        </View>
        <View style={styles.bottomView}>
          <View style={styles.chatInputView}>
            <View style={styles.chatInputView1}>
              <TouchableOpacity style={styles.roundButtonView} onPress={() => openFilePicker()}>
                <Image source={plus} style={styles.closeIcon} />
              </TouchableOpacity>
              <TextInput
                value={enterText}
                onChangeText={text => {
                  setEnterText(text); 
                }}
                placeholder="Ask anything"
                placeholderTextColor={COLORS.greyColor}
                style={[styles.textInput, {width: '78%'}]}
                multiline
              />
              <TouchableOpacity
                onPress={() => result != null ? onAttachmentStore() : onSendMessage()}
                disabled={enterText == '' ? true : textInputVisible}
                style={[styles.roundButtonView1, { backgroundColor: enterText != '' ? COLORS.primary : COLORS.lightPrimary }]}>
                <Image source={plane} style={[styles.closeIcon, { tintColor: COLORS.white }]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AIChatScreen;