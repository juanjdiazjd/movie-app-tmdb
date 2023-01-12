import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Movie } from '../../core/interfaces/Movies';
import theme from '../../core/theme/theme';

import { MoviePoster } from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
}

export const HorizontalSlider = ({ title, movies }: Props) => {
  return (
    <View style={{ height: 270 }}>
      {title && <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 15, color: theme.colors.white }}>{title}</Text>}
      <FlatList
        data={movies}
        renderItem={({ item }: any) => <MoviePoster movie={item} width={140} height={200} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
