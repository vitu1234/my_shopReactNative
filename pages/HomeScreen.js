import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Container, FlatList, Heading, HStack, ScrollView, Text, VStack} from 'native-base';
import {View, StyleSheet} from 'react-native';
import ButtonCategory from './components/ButtonCategory';
import {Dimensions} from 'react-native';
import ProductCard from './components/ProductCard';
import {CartContext} from '../app_contexts/CartContext';
import SQLite from 'react-native-sqlite-storage';
import Divider from 'native-base/src/components/composites/Divider/index';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const {width} = Dimensions.get('window');


const product_categories_list = [
    {
        'category_id': 1,
        'category_name': 'Shoes',
    },
    {
        'category_id': 2,
        'category_name': 'Electronics',
    },
    {
        'category_id': 3,
        'category_name': 'Automotives',
    },
    {
        'category_id': 4,
        'category_name': 'Children & Toys',
    },
    {
        'category_id': 5,
        'category_name': 'School & Books',
    },
];

const products_list = [
    {
        'product_id': 2,
        'product_name': 'Men\'s T-Shirt',
        'product_price': '6000',
        'img_url': require('../assets/products/tshirt_3.png'),
    }, {
        'product_id': 1,
        'product_name': 'Nike Shoes Men',
        'product_price': '30000',
        'img_url': require('../assets/products/shoes_1.png'),
    },

    {
        'product_id': 5,
        'product_name': 'Nike Shoes Universal',
        'product_price': '36000',
        'img_url': require('../assets/products/shoes_2.png'),
    },
    {
        'product_id': 3,
        'product_name': 'Macbook Air 2019',
        'product_price': '1200000',
        'img_url': require('../assets/products/macbook_4.png'),
    },
    {
        'product_id': 4,
        'product_name': 'iPhone X Max',
        'product_price': '970000',
        'img_url': require('../assets/products/phone_5.png'),
    },
];

const db = SQLite.openDatabase(
    {
        name: 'MainDB1',
        location: 'default',
        version: 2,
    },
    () => {
        // console.log('db creaetd')
    },
    error => {
        console.log(error);
    },
);


function HomeScreen(props) {
    const [categoryActive, setCategoryActive] = useState(-1);
    const [cartItemsCount, setCartItemsCount] = useContext(CartContext);

    const btnCategoryAction = (category_id) => {
        console.log('GOES TO ' + category_id + ' CATEGORY');
        setCategoryActive(category_id);
    };

    const productCardAction = (product) => {
        // console.log(product);
        props.navigation.navigate('ProductDetails', {data: product});
    };

    const setCartCounterNumber = () => {
        //update cart counter
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM cart',
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    setCartItemsCount(len);

                },
            );
        });
    };
    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS "cart" (id	INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,product_id	INTEGER NOT NULL,product_name	TEXT NOT NULL,product_price	TEXT NOT NULL,qty INTEGER NOT NULL, img_url INTEGER NOT NULL)',
            );

            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS '
                    + 'Users '
                    + '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);',
                );
            });
            console.log('created tanele');
        });
    };


    useEffect(() => {
        createTable();
        setCartCounterNumber();
    }, []);

    const renderCategoryList = product_categories_list.map((category) => {
        if (category.category_id === categoryActive) {
            return (
                <ButtonCategory key={category.category_id} data={{
                    btnText: category.category_name,
                    category_id: category.category_id,
                    action: btnCategoryAction,
                    bgColor: true,
                }}></ButtonCategory>
            );
        } else {
            return (

                <ButtonCategory key={category.category_id} data={{
                    btnText: category.category_name,
                    category_id: category.category_id,
                    action: btnCategoryAction,
                    bgColor: false,
                }}></ButtonCategory>
            );
        }


    });
    const renderProductList = products_list.map((product) => {
        return (
            <View key={product.product_id} style={{width: '25%', marginEnd: 20}}>
                <ProductCard data={{
                    product: product,
                    action: productCardAction,
                    cardWidth: 200,
                }}/>
            </View>
        );
    });

    const renderProductList2 = products_list.map((product) => {
        return (
            <ProductCard key={product.product_id} data={{
                product: product,
                action: productCardAction,
                cardWidth: 200,
            }}/>
        );
    });

    return (
        <View style={styles.container}>
            <Heading size="md" fontWeight='bold'>
                Let's help you find what you want!
                {/*<Text color="emerald.500"> React Ecosystem</Text>*/}
            </Heading>
            <ScrollView
                ref={(scrollView) => {
                    scrollView = scrollView;
                }}
                // style={s.container}
                //pagingEnabled={true}
                marginTop={5}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={width - 60}
                snapToAlignment={'center'}
                contentInset={{
                    top: 0,
                    left: 30,
                    bottom: 0,
                    right: 30,
                }}>

                {
                    (categoryActive === -1) ?
                        <ButtonCategory
                            data={{btnText: 'All', category_id: -1, action: btnCategoryAction, bgColor: true}}/>
                        :
                        <ButtonCategory
                            data={{
                                btnText: 'All',
                                category_id: -1,
                                action: btnCategoryAction,
                                bgColor: false,
                            }}/>
                }

                {renderCategoryList}
            </ScrollView>


            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <VStack>


                    <ScrollView
                        ref={(scrollView) => {
                            scrollView = scrollView;
                        }}
                        // style={s.container}
                        //pagingEnabled={true}
                        marginTop={5}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={width - 60}
                        snapToAlignment={'center'}
                        contentInset={{
                            top: 0,
                            left: 30,
                            bottom: 0,
                            right: 30,
                        }}>


                        {renderProductList}
                    </ScrollView>
                    <Divider style={{marginTop: 10}}/>
                    <View style={{display: 'flex', direction: 'row'}}>
                        <HStack style={{marginTop: 15}}>
                            <Heading size="md" fontWeight='bold'>
                                Flash Products
                                {/*<Text color="emerald.500"> React Ecosystem</Text>*/}
                            </Heading>
                            <Button onPress={() => console.log('Go to all products')} variant={'outline'} size={'sm'}
                                    style={{alignSelf: 'flex-end', marginLeft: 'auto'}}><Text>View
                                All</Text></Button>
                        </HStack>
                        <ScrollView
                            horizontal={true}
                            contentContainerStyle={{width: '100%', height: '100%'}}>
                            <FlatList
                                columnWrapperStyle={{justifyContent: 'space-between'}}
                                contentContainerStyle={{ paddingBottom: 80 }}

                                numColumns={2} horizontal={false}
                                data={products_list}
                                renderItem={({item}) =>
                                    <Box style={{width: '45%'}}
                                         py="2">
                                        <ProductCard key={item.product_id} data={{
                                            product: item,
                                            action: productCardAction,
                                            cardWidth: 200,
                                        }}/>
                                    </Box>
                                } keyExtractor={item => item.product_id}/>
                        </ScrollView>
                    </View>


                </VStack>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 5,
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
    },

    card: {
        flex: 1,
        margin: 10,
        flexBasis: '50%',
    },
});

export default HomeScreen;
