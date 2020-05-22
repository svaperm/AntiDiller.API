import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { getUserInfo } from "../../api/account";
import { colors, fonts } from "../../styles/index";
import { User, Report } from "../../types";

