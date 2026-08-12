import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS, Fonts } from "../utils";
import { normalize } from "./responsive";

const MeditationTimer = ({ 
    meditation,
    remainingSeconds,
    setRemainingSeconds,
    isRunning,
    setIsRunning,
    startTimer,
    pauseTimer,
  isEditable = true,
 }) => {
  // Example:
  // "15 mins mindfulness meditation on heartbeat"

  const meditationMinutes = useMemo(() => {
    const match = meditation?.match(/(\d+)\s*(?:mins?|minutes?)/i);

    return match ? parseInt(match[1], 10) : 0;
  }, [meditation]);

  const totalSeconds = meditationMinutes * 60;

  const initialMountRef = useRef(true);

  // Reset timer if meditation value changes, but preserve restored remainingSeconds on first mount.
  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      if (remainingSeconds === 0 || remainingSeconds === totalSeconds) {
        setRemainingSeconds(totalSeconds);
        setIsRunning(false);
      }
      return;
    }

    setRemainingSeconds(totalSeconds);
    setIsRunning(false);
  }, [totalSeconds]);

  // Timer
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (remainingSeconds <= 0) {
      setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, remainingSeconds]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };



  const progress =
    totalSeconds > 0
      ? (totalSeconds - remainingSeconds) / totalSeconds
      : 0;

  if (!meditationMinutes) {
    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Meditation</Text>
        <Text style={styles.foodText}>{meditation}</Text>
      </View>
    );
  }

  const resetTimer = () => {
    if (!isEditable) {
      Alert.alert('Read only', 'You can only reset meditation for today');
      return;
    }

    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  return (
      <View style={styles.section}>
        <Text style={styles.foodText}>
          {meditation}
        </Text>

        {/* Timer */}
        <View style={styles.timerContainer}>

          <Text style={styles.timerLabel}>
            Meditation Timer
          </Text>

          <Text style={styles.timerText}>
            {formatTime(remainingSeconds)}
          </Text>

          {/* Progress */}
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progress,
                {
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>

          {/* Buttons */}
          {remainingSeconds !== 0 && (
          <View style={styles.buttonRow}>

            {!isRunning ? (
              <TouchableOpacity
                style={styles.startButton}
                onPress={startTimer}
                disabled={remainingSeconds === 0 || !isEditable}
              >
                <Text style={styles.buttonText}>
                  {remainingSeconds === totalSeconds
                    ? "Start"
                    : "Resume"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.pauseButton}
                onPress={pauseTimer}
                disabled={!isEditable}
              >
                <Text style={styles.buttonText}>
                  Pause
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetTimer}
              disabled={!isEditable}
            >
              <Text style={styles.resetButtonText}>
                Reset
              </Text>
            </TouchableOpacity>

          </View>
          )}

          {/* Completion */}
          {remainingSeconds === 0 && (
            <Text style={styles.completedText}>
              🎉 Meditation completed!
            </Text>
          )}

        </View>
      </View>
  );
};

export default MeditationTimer;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  section: {
    width: "100%",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },

  foodText: {
    fontSize: normalize(15),
    lineHeight: 23,
    color: COLORS.white,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  timerContainer: {
    marginTop: 15,
    backgroundColor: COLORS.backColor,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },

  timerLabel: {
    fontSize: normalize(15),
    color: COLORS.secondary,
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginBottom: 8,
  },

  timerText: {
    fontSize: normalize(30),
    color: COLORS.secondary,
    letterSpacing: 2,
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  progressBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#DDE3E0",
    borderRadius: 10,
    marginTop: 18,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: COLORS.subPrimary,
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  startButton: {
    minWidth: 100,
    backgroundColor: COLORS.subPrimary,
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignItems: "center",
  },

  pauseButton: {
    minWidth: 100,
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 10,
    alignItems: "center",
  },

  resetButton: {
    minWidth: 90,
    backgroundColor: "#E8E8E8",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  resetButtonText: {
    color: COLORS.black,
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
  },

  completedText: {
    marginTop: 15,
    color: "#11998e",
    fontSize: 15,
    fontWeight: "700",
  },
});