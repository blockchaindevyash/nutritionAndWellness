import { create } from "zustand";

const useAuthStore = create((set) => ({

    signupData: {

        // Account
        name: "",
        email: "",
        mobileno: "",
        password: "",
        verify_phone: false,

        // User Info
        dob: "",
        gender: "",
        height: "",
        weight: "",

        // Goals
        goal: [],

        // Diet
        diet: "",

        // Activity
        activity_level: "",

        // Medical
        medical_condition: [],
        medical_condition_text: "",

        //doctor description
        prescription_file: null,
        health_note: "",
        current_medicine: [],
        // Workout
        workout_reference: "",
    },
    weeklyPlan: [],
    goalList: [],
    dietList: [],
    activityList: [],
    medicalList: [],
    workoutList: [],
    profileData: null,
    adviserList: [],

    updateSignupData: (data) =>
        set((state) => ({
            signupData: {
                ...state.signupData,
                ...data,
            },
        })),
    updateGoalData: (data) =>
        set((state) => ({
            goalList: data
        })),
    updateDietData: (data) =>
        set((state) => ({
            dietList: data
        })),
    updateActivityData: (data) =>
        set((state) => ({
            activityList: data
        })),
    updateMedicalData: (data) =>
        set((state) => ({
            medicalList: data
        })),
    updateWorkoutData: (data) =>
        set((state) => ({
            workoutList: data
        })),
    clearSignupData: () =>
        set({
            signupData: {},
        }),
    updateProfileData: (data) =>
        set({
            profileData: data
        }),
    updateWeeklyPlan: (data) =>
        set({
            weeklyPlan: data
        }),
    updateAdviserList: (data) =>
        set({
            adviserList: data
        }),

}));

export default useAuthStore;