import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../i18n';

const LANGS = [
  { code: 'en', labelKey: 'english' },
  { code: 'vi', labelKey: 'vietnamese' },
  { code: 'es', labelKey: 'spanish' },
  { code: 'ja', labelKey: 'japanese' },
  { code: 'zh', labelKey: 'chinese' },
  { code: 'ko', labelKey: 'korean' },
];

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = i18n.language || 'en';

  const select = async (code) => {
    await changeAppLanguage(code);
    setOpen(false);
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>{t('language')}</Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>{t('select_language')}</Text>
            {LANGS.map(l => (
              <TouchableOpacity
                key={l.code}
                style={[styles.langRow, current === l.code ? styles.selectedRow : null]}
                onPress={() => select(l.code)}
              >
                <Text style={styles.langText}>{t(l.labelKey)}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.close} onPress={() => setOpen(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 40, right: 12, zIndex: 999 },
  button: { backgroundColor: '#ffffffaa', padding: 8, borderRadius: 6 },
  buttonText: { fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: '#00000066', justifyContent: 'center', alignItems: 'center' },
  modal: { width: '80%', backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  langRow: { paddingVertical: 10 },
  langText: { fontSize: 14 },
  selectedRow: { backgroundColor: '#eee' },
  close: { marginTop: 12, alignSelf: 'flex-end' },
  closeText: { color: '#007AFF' },
});

export default LanguageSelector;
