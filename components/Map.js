import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, TouchableOpacity, View,Text} from "react-native"
import { Octicons, Ionicons } from '@expo/vector-icons';
import { StyledButton } from './styles';

const height = Dimensions.get('window').height
const Map = () => {
    const [region, setRegion] = useState(
        {
            latitude: 24.846531,
            longitude: 67.055418,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        })

    function ZoomIn() {

    }
    function ZoomOut() {

    }
    function RenderButton() {
        return (
            <View>
                <View style={{
                    position: 'absolute',
                    top: "70%",
                    left: "80%",
                    width: 60,
                    height: 130,
                    justifyContent: 'space-between'
                }}>
                    {/* Current Location  */}
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: "#ffffff",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{ fontSize: 30 }}><Octicons name='location' size={30} color={"#000"} /></Text>
                    </TouchableOpacity>
                    {/* Zoom in */}
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: "#ffffff",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} onPress={() => ZoomIn()}
                    >
                        <Text style={{ fontSize: 30 }}>+</Text>
                    </TouchableOpacity>
                    {/* Zoom out */}
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: "#ffffff",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => ZoomOut()}>
                        <Text style={{ fontSize: 30 }}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', width: '100%', top: '93%' }}>
                    <StyledButton>
                        <Text>Chose location</Text>
                    </StyledButton>
                </View>
            </View>
        )
    }
    function Handlelocation() {
        return (
            <View>
                <View>
                    <LeftIcon>
                        <Octicons name='location' size={30} color={brand} style={{ marginTop: -20 }} />
                    </LeftIcon>
                </View>
                <StyledButtonLocation onPress={toggleOverlay}>
                    <Text>Your location</Text>
                </StyledButtonLocation>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={styles.overlay}>
                        {RenderButton()}
                    </View>
                </Overlay>
            </View>
        );
    }
    return (
        <View>
            <MapView
                style={styles.map}
                loadingEnabled={true}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
            >
            </MapView>
            {RenderButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height
    }
})
export default Map;