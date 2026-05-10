import { StyleSheet, Text, View, Image,TextInput,Pressable,KeyboardAvoidingView,Platform} from "react-native";
import { useState } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	return (

		<SafeAreaView style={{
			flex: 1,
			backgroundColor: "white",
		}}>
			<View style={{
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				paddingTop: 40,
				paddingBottom: 50,
			}}>
				<Image source={require("@/assets/images/Screenshot.png")} style={{
					width: 100,
					height: 100,
				}}/>
				<Text style={{
					fontSize: 36,
					fontWeight: "bold",
				}}>
					Sign In
				</Text>	
				<Text style={{
					fontSize: 14,
					color: "gray",
					marginTop: 8
				}}>
					Let's experience the joy of telecare AI.
				</Text>		
			</View>
			<View style={{
				marginLeft: 14,
				marginRight: 14
			}}>
				<Text style={{
						fontSize: 14,
						fontWeight: "bold",
					}}>
						Email Address
				</Text>
				<View style={{
					borderRadius: 22,
					marginTop: 8,
					backgroundColor: "#FFFFFF",
					elevation: 4,
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
					<Image source={require("@/assets/images/Mail.jpg")} style={{
						marginLeft: 4,
						width: 40,
						height: 40,
					}}/>
					<TextInput placeholder="Enter your email..." value={email} onChangeText={setEmail} style={{
						padding: 20,
						paddingLeft:2,
						display: "flex",
						flex: 1,
					}}/>
				</View>

				<Text style={{
						fontSize: 14,
						fontWeight: "bold",
						marginTop: 24
					}}>
						Password
				</Text>
				<View style={{
					borderRadius: 22,
					marginTop: 8,
					backgroundColor: "#FFFFFF",
					elevation: 4,
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
					<Image source={require("@/assets/images/pass.png")} style={{
						marginLeft: 4,
						width: 40,
						height: 40,
					}}/>
					<TextInput placeholder="Enter your password..." value={pass} onChangeText={setPass} style={{
						display: "flex",
						flex: 1,
						padding: 20,
						paddingLeft:2
					}}/>
				</View>
				
				<Pressable onPress={()=> alert("Button Works!")} style={{
					backgroundColor: "#8BC324",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: 16,
					borderRadius: 22,
					marginTop: 30,
				}}>
					<Text style={{
						color: "white",
						fontSize: 16,
					}}>Sign In &#x2192; </Text>
				</Pressable>
			</View>

			<View style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				marginTop: 35,
			}}>
				<Pressable onPress={()=> alert("Button Works!")} style={{
					borderWidth: 1.5,
					borderColor: "lightgray",
					padding: 12,
					borderRadius: 22,
					marginRight: 8,
				}}>
					<Image source={require("@/assets/images/facebook.webp")} style={{
						width: 30,
						height: 30
					}}/>

				</Pressable>
				<Pressable onPress={()=> alert("Button Works!")} style={{
					borderWidth: 1.5,
					borderColor: "lightgray",
					padding: 12,
					borderRadius: 22,
					marginRight: 8,
				}}> 
					<Image source={require("@/assets/images/google-logo.webp")} style={{
						width: 30,
						height: 30
					}}/>
				</Pressable>
				<Pressable onPress={()=> alert("Button Works!")} style={{
					borderWidth: 1.5,
					borderColor: "lightgray",
					padding: 12,
					borderRadius: 22,
					marginRight: 10,
				}}> 
					<Image source={require("@/assets/images/insta.webp")} style={{
						width: 30,
						height: 30
					}}/>
				</Pressable>

			</View>
			<View style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				marginTop: 30,
			}}>
				<View style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
					<Text>
						Don't have an account?
					</Text>
					<Pressable 	onPress={()=> alert("Button Works!")}>
						<Text style={{
							color: "#8BC324",
						}}> 
							{" "}Sign Up.
						</Text>						
					</Pressable>
				</View>

				<Pressable onPress={()=> alert("Button Works!")} style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 10,
				}}>
					<Text style={{
						color: "#8BC324",
						textDecorationLine: "underline",
					}}> 
						Forgot your password?
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default index;

const styles = StyleSheet.create({});
