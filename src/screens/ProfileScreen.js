import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ProfileScreen = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/user/:userId', {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setUserProducts(response.data);
      } catch (err) {
        console.log('Error fetching user products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProducts();
  }, [userToken]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Your Products</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={userProducts}
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
    </View>
  );
};

export default ProfileScreen;