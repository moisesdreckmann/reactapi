import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import TabRouter from './src/navigation/TabRouter.js';
import 'react-native-gesture-handler';
import { AuthUserProvider } from './src/context/AuthContextCarrinho.js';
import { AuthUserProvider as AuthUserProviderLogin } from './src/context/AuthContextLogin.js';
import { FirestoreProvider } from './src/context/ContextFirestore.js';
import { ApiProvider } from './src/context/apiProvider.js';
import { FoodProvider } from './src/context/ContextApiDados';

const App = () => {
  // Altere o nome da coleção conforme necessário
  const [collectionName, setCollectionName] = useState("Comidas"); // ou "Bebidas"

  return (
    <NavigationContainer>
      <AuthUserProviderLogin>
        <ApiProvider>
          <FoodProvider>
            {/*<FirestoreProvider collectionName={collectionName}>*/}
              <AuthUserProvider> 
                <TabRouter />
              </AuthUserProvider>
            {/*</FirestoreProvider>*/}
            </FoodProvider>
          </ApiProvider>
      </AuthUserProviderLogin>
    </NavigationContainer>
  );
}

export default App;
