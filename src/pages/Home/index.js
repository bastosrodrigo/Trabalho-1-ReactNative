import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Rating } from "react-native-ratings";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";

//const { rating } = this.props;

const DATA_RECENTES = [
  {
    id: "1",
    urlImg:
      "https://images.pexels.com/photos/17054024/pexels-photo-17054024/free-photo-of-agricultura-colheita-safra-terra-cultivada.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "image 1",
    description: "description 1",
  },
  {
    id: "2",
    urlImg:
      "https://images.pexels.com/photos/16988521/pexels-photo-16988521/free-photo-of-animal-bicho-fofo-bonitinho.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "image 2",
    description: "description 2",
  },
  {
    id: "3",
    urlImg:
      "https://images.pexels.com/photos/16897680/pexels-photo-16897680/free-photo-of-arquitetura-construcao-predio-edificio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "image 3",
    description: "description 3",
  },
  {
    id: "4",
    urlImg:
      "https://images.pexels.com/photos/16636452/pexels-photo-16636452/free-photo-of-agricultura-arquitetura-construcao-predio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "image 4",
    description: "description 4",
  },
];

const DATA_DESTAQUE = {
  id: "1",
  urlImg:
    "https://images.pexels.com/photos/17054024/pexels-photo-17054024/free-photo-of-agricultura-colheita-safra-terra-cultivada.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  title: "image 1",
  description: "description 1",
  rating: 5,
};

const Editora = ({ img }) => {
  const onPressHandler = () => {
    console.log("hi");
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onPressHandler}>
        <ImageBackground
          source={{
            uri: `data:image/png;base64,${img}`,
          }}
          style={styles.imageEditora}
        ></ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const CardLivro = ({ urlImage, title, description }) => (
  <View style={styles.CardLivro}>
    <Image
      source={{
        uri: urlImage,
      }}
      style={styles.imageCardLivro}
    ></Image>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

const CardDestaque = ({ urlImage, title, description, rating }) => (
  <View style={styles.CardDestaque}>
    <Image
      source={{
        uri: urlImage,
      }}
      style={styles.imageCardDestaque}
    ></Image>
    <View style={styles.destaqueBodyContainer}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <View style={styles.rating}>
        <Rating startingValue={4} readonly imageSize={20} />
      </View>
    </View>
  </View>
);

export default function Home() {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState();

  useEffect(() => {
    getTodasEditoras();
  }, []);

  const getTodasEditoras = async () => {
    await AxiosInstance.get("/editoras", {
      headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
    })
      .then((resultado) => {
        console.log("GetTodasEditoras:" + resultado.data);
        setDadosEditora(resultado.data);
      })
      .catch((error) => {
        console.log(
          "Ocorreu um erro ao recuperar os dados das Editoras: " + error
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.editorasContainer}>
        <FlatList
          //disableScrollViewPanResponder
          horizontal={true}
          data={dadosEditora}
          renderItem={({ item }) => (
            <Editora img={item.img} text={item.nomeEditora} />
          )}
          keyExtractor={(item) => item.codigoEditora}
        />
      </View>
      <View style={styles.recentesContainer}>
        <Text style={styles.recentesContainer.text}>Recentes</Text>
        <FlatList
          horizontal={true}
          data={DATA_RECENTES}
          renderItem={({ item }) => (
            <CardLivro
              urlImage={item.urlImg}
              title={item.title}
              description={item.description}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.destaqueContainer}>
        <Text style={styles.recentesContainer.text}>Destaque</Text>
        <CardDestaque
          urlImage={DATA_DESTAQUE.urlImg}
          title={DATA_DESTAQUE.title}
          description={DATA_DESTAQUE.description}
          rating={DATA_DESTAQUE.rating}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    flex: 1,
    marginTop: 37,
    padding: 10,
  },
  editorasContainer: {
    backgroundColor: "black",
    flex: 0.5,
  },

  recentesContainer: {
    alignItems: "flex-start",

    backgroundColor: "black",
    flex: 0.6,

    text: {
      color: "white",
      fontSize: 20,
    },
  },
  destaqueContainer: {
    alignItems: "flex-start",

    backgroundColor: "black",
    flex: 1,

    text: {
      color: "white",
      fontSize: 20,
    },
  },

  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    alignSelf: "center",
    borderRadius: 10,
  },
  cardTitle: {
    color: "black",
    fontSize: 16,
    textAlign: "left",
    borderRadius: 10,
    paddingLeft: 3,
  },
  cardDescription: {
    color: "gray",
    fontSize: 12,
    textAlign: "left",
    borderRadius: 10,
    paddingLeft: 3,
  },

  input: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 5,
    padding: 4,
    width: 200,
  },

  button: {
    backgroundColor: "white",
    marginTop: 10,
    width: 200,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },

  buttonText: {
    color: "white",
  },
  item: {
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  imageEditora: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 30,
    //marginTop: 40,
    justifyContent: "center",
  },
  imageCardLivro: {
    width: 110,
    height: 120,
    resizeMode: "cover",
  },
  imageCardDestaque: {
    width: 340,
    height: 230,
    resizeMode: "cover",
  },
  CardLivro: {
    backgroundColor: "white",
    borderColor: "black",
    alignSelf: "center",
    borderRadius: 5,
    paddingBottom: 3,
    marginRight: 20,
  },
  CardDestaque: {
    backgroundColor: "white",
    borderColor: "black",
    alignSelf: "center",
    borderRadius: 5,
    paddingBottom: 3,
    marginTop: 3,
  },
  destaqueBodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    padding: 10,
  },
});