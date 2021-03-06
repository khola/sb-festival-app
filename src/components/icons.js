import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { View } from "react-native";
/*
const Icon = props => <View {...props} />;
*/

const CalendarIco = props => <Icon name="calendar" size={20} color="#FFFFFF" {...props} />;
const LikeIco = props => <Icon name="heart" color="#FFFFFF" {...props} />;
const UnlikeIco = props => <Icon name="times" color="#FFFFFF" {...props} />;
const AZIco = props => <Icon name="th-large" size={20} color="#FFFFFF" {...props} />;
const WwwIco = props => <Icon name="info" color="#FFFFFF" {...props} />;
const MusicIco = props => <Icon name="music" color="#FFFFFF" {...props} />;
const VideoIco = props => <Icon name="video-camera" color="#FFFFFF" {...props} />;
const BackIco = props => <Icon name="chevron-left" color="#FFFFFF" {...props} />;
const MarkerIco = props => <Icon name="map-marker" color="#FFFFFF" {...props} />;
const AboutIco = props => <Icon name="angellist" color="#FFFFFF" {...props} />;

export { CalendarIco, AZIco, WwwIco, MusicIco, VideoIco, LikeIco, BackIco, UnlikeIco, MarkerIco, AboutIco };
