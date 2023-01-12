import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';
import { FlatList } from 'react-native-gesture-handler';
import { MovieFull } from '../../core/interfaces/Movies';
import { Cast } from '../../core/interfaces/Credits';
import theme, { styled } from '../../core/theme/theme';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

const TextFlag = styled(Text)`
  align-items: center;
  text-align: center;
  padding-left: 10px;
  color: ${theme.colors.white};
`;
export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
      <View style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', padding: 20 }}>
        <TextFlag>{`${movieFull.release_date} | `}</TextFlag>
          
          <TextFlag><Icon name="star-outline" color="yellow" size={16} />{`  ${movieFull.vote_average.toFixed(2)}`}</TextFlag>
          <TextFlag style={{ marginLeft: 5, maxWidth:200 }}>{`|   ${movieFull.genres.map((g) => g.name).join(', ')}`}</TextFlag>
        </View>
        <View style={{ flexDirection: 'column', padding: 20 }}>
        <TextFlag style={{ fontSize: 20, marginTop: 10 }}>Historia</TextFlag>
        <TextFlag>{movieFull.overview}</TextFlag>
        <TextFlag style={{ fontSize: 20, marginTop: 10 }}>Presupuesto</TextFlag>
        <TextFlag> {currencyFormatter.format(movieFull.budget, { code: 'USD' })} </TextFlag>
        <TextFlag style={{ fontSize: 20, marginTop: 10 }}>Actores</TextFlag>
        </View>
      </View>

      {/* casting */}

      <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CastItem actor={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      />
    </>
  );
};
