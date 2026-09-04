import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../utils';
import { onGetCommonApi } from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/HeaderComponent';
import { useTranslation } from 'react-i18next';
import down from '../../images/down.png';
import searchIcon from '../../images/search.png';
import SelectDropdown from 'react-native-select-dropdown';
import { hp, wp } from '../../components/responsive';

const consultantsList = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialist: "Dietitian",
    category: "Dietitian",
    degree: "M.Sc. Clinical Nutrition, RD",
    experience: "8 years",
    features: [
      "Personalized Diet Plans",
      "Weight Management",
      "Healthy Meal Planning",
      "Lifestyle Counseling"
    ],
    consultationFee: 800,
    currency: "INR",
    rating: 4.8,
    reviews: 156,
    availableDays: [
      "Monday",
      "Tuesday",
      "Thursday",
      "Friday"
    ],
    availableTime: "10:00 AM - 5:00 PM",
    about: "Provides personalized nutrition and diet plans based on individual health goals, lifestyle, and dietary preferences.",
    profileImage: "https://example.com/images/priya-sharma.jpg"
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialist: "Dietitian",
    category: "Dietitian",
    degree: "M.Sc. Food & Nutrition, RD",
    experience: "10 years",
    features: [
      "Weight Loss Programs",
      "Therapeutic Diet",
      "Diabetes Nutrition",
      "Heart Healthy Diet"
    ],
    consultationFee: 1000,
    currency: "INR",
    rating: 4.7,
    reviews: 203,
    availableDays: [
      "Monday",
      "Wednesday",
      "Friday",
      "Saturday"
    ],
    availableTime: "9:00 AM - 4:00 PM",
    about: "Specializes in therapeutic nutrition and customized diet programs for weight management and chronic health conditions.",
    profileImage: "https://example.com/images/rahul-mehta.jpg"
  },
  {
    id: 3,
    name: "Dr. Anjali Patel",
    specialist: "Endocrinologist",
    category: "Endocrinologist",
    degree: "MBBS, MD - Endocrinology",
    experience: "12 years",
    features: [
      "Diabetes Management",
      "Thyroid Disorders",
      "Hormonal Disorders",
      "Obesity Management"
    ],
    consultationFee: 1200,
    currency: "INR",
    rating: 4.9,
    reviews: 321,
    availableDays: [
      "Monday",
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    availableTime: "11:00 AM - 6:00 PM",
    about: "Experienced endocrinologist specializing in diabetes, thyroid conditions, metabolic disorders, and hormonal health.",
    profileImage: "https://example.com/images/anjali-patel.jpg"
  },
  {
    id: 4,
    name: "Dr. Amit Shah",
    specialist: "Endocrinologist",
    category: "Endocrinologist",
    degree: "MBBS, MD, DM - Endocrinology",
    experience: "15 years",
    features: [
      "Thyroid Treatment",
      "Diabetes Care",
      "PCOS Management",
      "Hormone Therapy"
    ],
    consultationFee: 1500,
    currency: "INR",
    rating: 4.8,
    reviews: 278,
    availableDays: [
      "Tuesday",
      "Wednesday",
      "Friday",
      "Sunday"
    ],
    availableTime: "10:00 AM - 7:00 PM",
    about: "Provides comprehensive evaluation and management of endocrine and hormonal disorders.",
    profileImage: "https://example.com/images/amit-shah.jpg"
  },
  {
    id: 5,
    name: "Dr. Neha Kapoor",
    specialist: "Allergist / Immunologist",
    category: "Allergist / Immunologist",
    degree: "MBBS, MD - Allergy & Clinical Immunology",
    experience: "9 years",
    features: [
      "Food Allergy",
      "Drug Allergy",
      "Skin Allergy",
      "Asthma & Allergy Care"
    ],
    consultationFee: 1100,
    currency: "INR",
    rating: 4.8,
    reviews: 184,
    availableDays: [
      "Monday",
      "Wednesday",
      "Thursday",
      "Saturday"
    ],
    availableTime: "9:30 AM - 3:30 PM",
    about: "Specializes in diagnosing and managing allergic conditions, asthma, food allergies, and medication-related allergies.",
    profileImage: "https://example.com/images/neha-kapoor.jpg"
  },
  {
    id: 6,
    name: "Dr. Karan Desai",
    specialist: "Allergist / Immunologist",
    category: "Allergist / Immunologist",
    degree: "MBBS, MD - Allergy & Immunology",
    experience: "11 years",
    features: [
      "Respiratory Allergies",
      "Food Allergy Testing",
      "Allergic Rhinitis",
      "Asthma Management"
    ],
    consultationFee: 1300,
    currency: "INR",
    rating: 4.7,
    reviews: 142,
    availableDays: [
      "Tuesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    availableTime: "10:00 AM - 5:00 PM",
    about: "Focuses on allergy diagnosis, respiratory allergies, asthma, and immune system-related conditions.",
    profileImage: "https://example.com/images/karan-desai.jpg"
  },
  {
    id: 7,
    name: "Dr. Meera Joshi",
    specialist: "Immunologist",
    category: "Immunologist",
    degree: "MBBS, MD, Fellowship in Clinical Immunology",
    experience: "13 years",
    features: [
      "Immune Disorders",
      "Autoimmune Conditions",
      "Immune Deficiency",
      "Immunological Evaluation"
    ],
    consultationFee: 1400,
    currency: "INR",
    rating: 4.9,
    reviews: 216,
    availableDays: [
      "Monday",
      "Tuesday",
      "Thursday",
      "Friday"
    ],
    availableTime: "11:00 AM - 6:00 PM",
    about: "Provides specialist consultation for immune system disorders, autoimmune conditions, and immune deficiencies.",
    profileImage: "https://example.com/images/meera-joshi.jpg"
  },
  {
    id: 8,
    name: "Dr. Arjun Verma",
    specialist: "Immunologist",
    category: "Immunologist",
    degree: "MBBS, MD - Internal Medicine, Fellowship in Immunology",
    experience: "10 years",
    features: [
      "Autoimmune Disorders",
      "Immune System Health",
      "Chronic Inflammation",
      "Immune Deficiency"
    ],
    consultationFee: 1250,
    currency: "INR",
    rating: 4.8,
    reviews: 167,
    availableDays: [
      "Wednesday",
      "Thursday",
      "Saturday",
      "Sunday"
    ],
    availableTime: "10:00 AM - 4:00 PM",
    about: "Specializes in immune system evaluation and management of autoimmune and immunological conditions.",
    profileImage: "https://example.com/images/arjun-verma.jpg"
  },
  {
    id: 9,
    name: "Dr. Riya Malhotra",
    specialist: "Nutritionist",
    category: "Nutritionist",
    degree: "M.Sc. Nutrition & Dietetics",
    experience: "7 years",
    features: [
      "Nutrition Counseling",
      "Weight Management",
      "Meal Planning",
      "Sports Nutrition"
    ],
    consultationFee: 700,
    currency: "INR",
    rating: 4.7,
    reviews: 129,
    availableDays: [
      "Monday",
      "Wednesday",
      "Friday",
      "Saturday"
    ],
    availableTime: "9:00 AM - 2:00 PM",
    about: "Helps clients develop practical nutrition strategies, balanced meal plans, and sustainable healthy eating habits.",
    profileImage: "https://example.com/images/riya-malhotra.jpg"
  },
  {
    id: 10,
    name: "Dr. Vikram Joshi",
    specialist: "Nutritionist",
    category: "Nutritionist",
    degree: "M.Sc. Clinical Nutrition",
    experience: "6 years",
    features: [
      "Personalized Nutrition",
      "Weight Loss",
      "Lifestyle Nutrition",
      "Preventive Nutrition"
    ],
    consultationFee: 750,
    currency: "INR",
    rating: 4.6,
    reviews: 98,
    availableDays: [
      "Tuesday",
      "Thursday",
      "Friday",
      "Sunday"
    ],
    availableTime: "10:00 AM - 5:00 PM",
    about: "Focuses on personalized nutrition, healthy lifestyle changes, weight management, and preventive health.",
    profileImage: "https://example.com/images/vikram-joshi.jpg"
  }
];

const ConsultantScreen = ({ navigation }) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const [recipeList, setRecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState('All Specialists');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedFee, setSelectedFee] = useState('All');
  const [search, setSearch] = useState('');
  const { t } = useTranslation();


  const specialistOptions = [
    { label: 'All Specialists', value: 'All Specialists' },
    { label: 'Dietitian', value: 'Dietitian' },
    { label: 'Endocrinologist', value: 'Endocrinologist' },
    {
      label: 'Allergist / Immunologist',
      value: 'Allergist / Immunologist',
    },
    { label: 'Immunologist', value: 'Immunologist' },
    { label: 'Nutritionist', value: 'Nutritionist' },
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 'All' },
    { label: '4.5+ Rating', value: '4.5' },
    { label: '4.7+ Rating', value: '4.7' },
    { label: '4.8+ Rating', value: '4.8' },
    { label: '4.9+ Rating', value: '4.9' },
  ];

  const feeOptions = [
    { label: 'All Fees', value: 'All' },
    { label: 'Under ₹800', value: '800' },
    { label: 'Under ₹1000', value: '1000' },
    { label: 'Under ₹1200', value: '1200' },
    { label: 'Under ₹1500', value: '1500' },
  ];

  const filteredConsultants = useMemo(() => {
    return consultantsList.filter(item => {
      // Specialist filter
      const specialistMatch =
        selectedSpecialist === 'All Specialists' ||
        item.category === selectedSpecialist;

      // Rating filter
      const ratingMatch =
        selectedRating === 'All' ||
        item.rating >= Number(selectedRating);

      // Fee filter
      const feeMatch =
        selectedFee === 'All' ||
        item.consultationFee <= Number(selectedFee);

      // Search filter
      const searchMatch =
        search.trim() === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.specialist.toLowerCase().includes(search.toLowerCase());

      return (
        specialistMatch &&
        ratingMatch &&
        feeMatch &&
        searchMatch
      );
    });
  }, [
    selectedSpecialist,
    selectedRating,
    selectedFee,
    search,
  ]);

  const clearFilters = () => {
    setSelectedSpecialist('All');
    setSelectedRating('All');
    setSelectedFee('All');
    setSearch('');
  };

  const renderConsultant = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            source={{ uri: item.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>
              {item.name}
            </Text>
            <Text style={styles.specialist}>
              {item.specialist}
            </Text>
            <Text style={styles.degree} numberOfLines={2}>
              {item.degree}
            </Text>
            <View style={styles.ratingRow}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>
                {item.rating}
              </Text>
              <Text style={styles.reviews}>
                ({item.reviews} reviews)
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.experienceRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              {t('experience')}
            </Text>
            <Text style={styles.infoValue}>
              {item.experience}
            </Text>
          </View>
        </View>
        <View style={styles.featuresContainer}>
          {item.features.slice(0, 3).map((feature, index) => (
            <View
              key={index}
              style={styles.feature}>
              <Text style={styles.featureText}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.availabilityContainer}>
          <View>
            <Text style={styles.infoLabel}>
              {t('available')}
            </Text>
            <Text style={styles.availableText}>
              {item.availableDays.slice(0, 2).join(', ')}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.infoLabel}>
              {t('time')}
            </Text>
            <Text style={styles.availableText}>
              {item.availableTime}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.consultButton}
          activeOpacity={0.8}
          onPress={() => {
            console.log('Consultant:', item);
          }}>
          <Text style={styles.consultButtonText}>
            {t('book_consultation')}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingTop: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      <View style={styles.headerView}>
      <Header title={t('find_consultant')} onPress={() => navigation.goBack()} />
        </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {t('choose_right_specialist')}
        </Text>
      </View>
      {/* Search */}
      <View style={styles.searchContainer}>
        {/* <Text style={styles.searchIcon}>
          🔍
        </Text> */}
        <Image source={searchIcon} style={styles.optionImageStyle} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={t('search_consultant')}
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>
      {/* Filters */}
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>
          {t('filters')}
        </Text>
        <TouchableOpacity onPress={clearFilters}>
          <Text style={styles.clearText}>
            {t('clear_all')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        <SelectDropdown
          data={specialistOptions}
          defaultValueByIndex={0}
          dropdownOverlayColor="transparent"
          onSelect={(selectedItem, index) => {
            setSelectedSpecialist(selectedItem?.value);
            console.log('gert Value:::', selectedItem?.value);
          }}
          renderButton={(selectedItem, isOpen) => {
            return (
              <View style={[styles.dropdown2BtnStyle2, { marginTop: hp(0.5) }]}>
                {selectedSpecialist != '' ? (
                  <Text style={styles.dropdownItemTxtStyle}>
                    {selectedSpecialist == selectedItem?.value
                      ? selectedItem?.value
                      : selectedSpecialist}
                  </Text>
                ) : (
                  <Text style={styles.dropdownItemTxtStyle}>
                    {selectedItem?.value || 'Specialist'}
                  </Text>
                )}
                <View style={{ width: wp(7) }}>
                  <Image style={styles.filterImage} source={down} />
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index, isSelected) => {
            return (
              <TouchableOpacity style={styles.dropdownView}>
                <Text style={styles.dropdownItemTxtStyle}>
                  {item?.value}
                </Text>
              </TouchableOpacity>
            );
          }}
          dropdownIconPosition={'left'}
          dropdownStyle={styles.dropdown2DropdownStyle}
        />
      </View>
      {/* Result count */}
      <View style={styles.resultHeader}>
        <Text style={styles.resultText}>
          {filteredConsultants.length} {t('consultants_found')}
        </Text>
      </View>
      {/* Consultant list */}
      <FlatList
        data={filteredConsultants}
        keyExtractor={item => item.id.toString()}
        renderItem={renderConsultant}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              🔍
            </Text>
            <Text style={styles.emptyTitle}>
              {t('no_consultants_found')}
            </Text>
            <Text style={styles.emptyText}>
              {t('changing_filter')}
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={clearFilters}>
              <Text style={styles.emptyButtonText}>
                {t('clear_filters')}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default ConsultantScreen;