package com.raiesbo.jettipapp

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CornerSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Slider
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.raiesbo.jettipapp.components.InputField
import com.raiesbo.jettipapp.ui.theme.JetTipAppTheme
import com.raiesbo.jettipapp.widgets.RoundIconButton
import kotlin.math.round

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp {
                Column() {
                    TopHeader()
                    MainContent()
                }
            }
        }
    }
}

@Composable // Content is anything that we pass as parameters // like: Children
fun MyApp(content: @Composable () -> Unit) {
    JetTipAppTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colors.background
        ) {
            content()
        }
    }
}

// @Preview(showBackground = true)
@Composable
fun MainContent() {
    BillForm() { billAmt ->
        Log.d("TAG", "Things happening here: $billAmt")
    }
}

// @Preview(showBackground = false)
@Composable
fun TopHeader(totalPerPerson: Double = 134.0) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .height(150.dp)
            .padding(15.dp)
            .clip(shape = RoundedCornerShape(corner = CornerSize(12.dp))),
        color = Color(0xFFE9D7F7)
    ) {
        val total = "%.2f".format(totalPerPerson)
        Column(
            modifier = Modifier.padding(12.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Total Per Person",
                style = MaterialTheme.typography.h5
            )
            Text(
                text = "$total €",
                style = MaterialTheme.typography.h4,
                fontWeight = FontWeight.ExtraBold
            )
        }
    }
}


@OptIn(ExperimentalComposeUiApi::class)
@Composable
fun BillForm(
    modifier: Modifier = Modifier,
    onValChange: (String) -> Unit = {}
) {
    val totalBillState = remember {
        mutableStateOf("")
    }

    val validState = remember(totalBillState.value) {
        totalBillState.value.trim().isNotEmpty()
    }

    val keyboardController = LocalSoftwareKeyboardController.current

    val sliderPositionState = remember {
        mutableStateOf(0f)
    }

    val numPeople = remember {
        mutableStateOf(1)
    }



    Surface(
        modifier = Modifier
            .padding(start = 15.dp, end = 15.dp)
            .fillMaxWidth(),
        shape = RoundedCornerShape(corner = CornerSize(12.dp)),
        border = BorderStroke(width = 1.dp, color = Color.LightGray)
    ) {
        Column(
            modifier = Modifier.padding(6.dp),
            verticalArrangement = Arrangement.Top,
            horizontalAlignment = Alignment.Start
        ) {
            InputField(
                valueState = totalBillState,
                labelId = "Enter Bill",
                enabled = true,
                isSingleLine = true,
                onActions = KeyboardActions {
                    if (!validState) return@KeyboardActions
                    onValChange(totalBillState.value.trim())
                    keyboardController?.hide()
                }
            )
            if (true) { // validState
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                ) {
                    Text(
                        text = "Split",
                        modifier = Modifier.align(
                            alignment = Alignment.CenterVertically
                        )
                    )
                    Row(
                        modifier = Modifier.padding(horizontal = 3.dp, vertical = 12.dp),
                        horizontalArrangement = Arrangement.End
                    ) {
                        if (numPeople.value > 1) {
                            RoundIconButton(
                                imageVector = Icons.Default.Remove, // Remove Icon
                                onClick = { numPeople.value-- }
                            )
                        } else {
                            Box {}
                        }
                        Text(
                            text = numPeople.value.toString(),
                            modifier = Modifier
                                .align(Alignment.CenterVertically)
                                .padding(start = 9.dp, end = 9.dp)
                        )
                        RoundIconButton(
                            imageVector = Icons.Default.Add,
                            onClick = { numPeople.value++ }
                        )
                    }
                }
                // Tip row
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Tip",
                        modifier = Modifier
                            .align(Alignment.CenterVertically)
                    )
                    Text(
                        text = "33,00 €",
                        modifier = Modifier.align(Alignment.CenterVertically)
                    )
                }
                // Tip column
                Column(
                    modifier = Modifier,
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "${sliderPositionState.value}%")
                    Spacer(modifier = Modifier.height(14.dp))
                    // Slider
                    Slider(
                        value = round(sliderPositionState.value * 100) / 100,
                        onValueChange = { newVal ->
                            sliderPositionState.value = newVal
                            Log.d("Slider", "$newVal")
                        },
                        modifier = Modifier.padding(start = 16.dp, end = 16.dp),
                        steps = 5
                    )
                }
            } else {
                Box {}
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    JetTipAppTheme {
        MyApp {
            Column() {
                TopHeader()
                MainContent()
            }
        }
    }
}