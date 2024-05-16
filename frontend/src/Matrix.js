import React from 'react';
import { Stack, Container, Typography, Box, Grid } from '@mui/material';
import './Matrix.css'; // 스타일을 정의할 CSS 파일

const Matrix = ({ data }) => {
  // 매트릭스 크기 설정
  const size = 10;
  const COLOR = [
    "#008000b3",
    "#FFFF00b3",
    "#FFA500b3",
    "#FF0000b3",

  ]
  // 빈 매트릭스 초기화
  const matrix = Array(size).fill(null).map(() => Array(size).fill(null));
  const determine = (col, row) =>{
    let colorIndex = -1
    if (col + row <= 7){
      colorIndex = 0
    }
    else if (col + row <= 11){
      colorIndex = 1
    }
    else if (col + row <= 14){
      colorIndex = 2
    }
    else {
      colorIndex = 3
    }
    return (
     COLOR[colorIndex]
    )
  }
  // 데이터 기반으로 매트릭스에 항목 배치
  data.forEach(item => {
    const { id, serious, probability } = item;
    matrix[size - serious][probability - 1] = id;
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 3 }} gutterBottom>
        Serious vs Probability Matrix
      </Typography>
      <Stack direction="row">
        <Stack>
        <Box className="matrix-cell header" sx={{ height: `${50}px` , width :"70px" }}></Box>
        <Box className="matrix-cell header rotate-text" sx={{ height: `${52*matrix.length + 52}px` , width :"70px", fontSize : 25  }}>Serious</Box>
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Box className="matrix-cell header" sx= {{fontSize : 25 }}>Probability</Box>
          <Box spacing={1} sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(11, 1fr)',
            justifyContent: 'center', // 중앙 정렬 추가,
            margin: 'auto'
          }}>

            <Box className="matrix-cell header"></Box>

            {Array.from({ length: size }, (_, i) => (
              <Box className="matrix-cell header">{i + 1}</Box>
            ))}
            {matrix.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <Box className="matrix-cell header">{size - rowIndex}</Box>
                {row.map((cell, colIndex) => (
                  <Box className="matrix-cell" sx = {{backgroundColor : determine(10-rowIndex, colIndex)}}>{cell}</Box>
                ))}
              </React.Fragment>
            ))}
          </Box></Box>
      </Stack>
    </Container>
  );
};

export default Matrix;