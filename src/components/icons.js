import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CalendarIco = props => <Icon name="calendar" size={20} color="#FFFFFF" {...props} />;
const LikeIco = props => <Icon name="heart" color="#FFFFFF" {...props} />;
const UnlikeIco = props => <Icon name="times" color="#FFFFFF" {...props} />;
const AZIco = props => <Icon name="sort" size={20} color="#FFFFFF" {...props} />;
const WwwIco = props => <Icon name="info" color="#FFFFFF" {...props} />;
const MusicIco = props => <Icon name="music" color="#FFFFFF" {...props} />;
const VideoIco = props => <Icon name="video-camera" color="#FFFFFF" {...props} />;
const BackIco = props => <Icon name="chevron-left" color="#FFFFFF" {...props} />;

export { CalendarIco, AZIco, WwwIco, MusicIco, VideoIco, LikeIco, BackIco, UnlikeIco };
