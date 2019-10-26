import React from 'react';
import { View } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Card, CardItem, Text, Right, Left, Thumbnail, Body } from 'native-base';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';

let comments = [
  {
    content: "It's the best thing in my room other than my wife",
    author: "Joe"
  }, {
    content: "Hey man, your mum is gay",
    author: "Mike Haque"
  }
]
const CommentList = () => {
  return (
    <Card>
      <CardItem bordered>
        <Left>
          <Body>
            <Text style={{ color: '#4da6ff' }}>Joe Warner</Text>
            <Text note>It's the best thing in my room </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Body>
            <Text style={{ color: '#4da6ff' }}>Mike Lock</Text>
            <Text note>Looks pretty good in my room</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  )
}

export default CommentList;