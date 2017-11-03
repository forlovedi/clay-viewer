export default "@export qmv.editor.edge\n\nuniform sampler2D texture;\n\nuniform vec2 textureSize;\n\nuniform vec4 edgeColor: [0,0,0,1.0];\nuniform float edgeWidth: 1;\n\nvarying vec2 v_Texcoord;\n\nfloat getCol(vec2 coord) {\n return texture2D(texture, coord).a;\n}\n\nvoid main() {\n vec2 cc = v_Texcoord;\n float center = getCol(cc);\n\n float dx = edgeWidth / textureSize.x;\n float dy = edgeWidth / textureSize.y;\n\n vec2 coord;\n float topLeft = getCol(cc+vec2(-dx, -dy));\n float top = getCol(cc+vec2(0.0, -dy));\n float topRight = getCol(cc+vec2(dx, -dy));\n float left = getCol(cc+vec2(-dx, 0.0));\n float right = getCol(cc+vec2(dx, 0.0));\n float bottomLeft = getCol(cc+vec2(-dx, dy));\n float bottom = getCol(cc+vec2(0.0, dy));\n float bottomRight = getCol(cc+vec2(dx, dy));\n\n float v = -topLeft-2.0*top-topRight+bottomLeft+2.0*bottom+bottomRight;\n float h = -bottomLeft-2.0*left-topLeft+bottomRight+2.0*right+topRight;\n\n float edge = sqrt(h * h + v * v);\n\n edge = smoothstep(0.9, 1.0, edge);\n if (edge < 0.5) {\n discard;\n }\n\n gl_FragColor = edgeColor;\n}\n@end";