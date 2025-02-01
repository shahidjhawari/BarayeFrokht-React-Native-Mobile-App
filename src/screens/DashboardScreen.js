import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const DashboardScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setProducts(response.data);
      } catch (err) {
        console.log('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [userToken]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Dashboard</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>${item.price}</Text>
            </View>
          )}
        />
      )}
      <Button title="Upload Product" onPress={() => navigation.navigate('UploadProduct')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default DashboardScreen;