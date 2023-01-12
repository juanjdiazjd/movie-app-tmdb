import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, StatusBar, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackground } from '../../components/Movies/GradientBackground';
import { HorizontalSlider } from '../../components/Movies/HorizontalSlider';
import { GradientContext } from '../../core/context/GradientContext';
import { getImageColors } from '../../core/helpers';
import { useSearchMovie } from '../../hooks/useSearchMovie';
import theme, { styled } from '../../core/theme/theme';
import Icon from 'react-native-vector-icons/Feather';

const { width: windowWidth } = Dimensions.get('window');

const ContainerSearchBar = styled(View)`
  padding: 10px;
  flex-direction: row;
  width: 95%;
  background-color: ${theme.colors.white};
  border-radius: 15px;
  align-self: center;
`;

const CustomTextInput = styled(TextInput)`
  font-size: 20px;
  margin-left: 10px;
  width: 90%;
`;

const SearchScreen = () => {
  const [clicked, setClicked] = useState(false);

  const { movies, isLoading, searchTerm, setSearchTerm } = useSearchMovie();
  const { top } = useSafeAreaInsets();

  const { setMainColors } = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = movies[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({ primary, secondary });
  };

  useEffect(() => {
    if (movies.length > 0) {
      getPosterColors(0);
    }
  }, [movies]);

  useEffect(() => {
    setSearchTerm('');
  }, []);

  return (
    <GradientBackground>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <View style={{ marginTop: top + 20 }}>
          <ContainerSearchBar>
            <Icon name="search" size={20} color="black" style={{ marginLeft: 1 }} />
            <CustomTextInput
              onFocus={() => {
                setClicked(true);
              }}
              label={'Search movies'}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </ContainerSearchBar>
          {movies ? <HorizontalSlider title="Results" movies={movies} /> : <Text> no results </Text>}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default SearchScreen;
