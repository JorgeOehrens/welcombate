// WELCOMBATE — run-and-gun cooperativo · Platanus Hack 26
// Los chefs de WelcomeBack recuperan La Vega de los robots-caja de El Crítico.
// Arte propio: pixel art embebido (data: URI) + escenarios dibujados por código.

// Arcade cabinet button → keyboard key mapping.
// DO NOT modify this mapping — it matches the real arcade cabinet wiring.
const { abs: ab, min: mn, max: mx, sin: sn, cos: cs, random: rn } = Math;
Phaser.GameObjects.Graphics.prototype.F = function (c, x, y, w, h) { return this.fillStyle(c).fillRect(x, y, w, h); };
// alias cortos para los métodos más usados (ahorra ~1 KB)
Array.prototype.e = Array.prototype.forEach;
'D=setDepth,O=setOrigin,Z=setScrollFactor,K=setScale,Q=setPosition,V=setVisible,X=setFlipX,B=destroy,T=setText,N=setTint,R=setFrame,A=setAlpha,J=setStroke,U=setTileScale'.split(',').e((p) => { const [a, b] = p.split('='); for (const c of ['Image', 'Text', 'Rectangle', 'TileSprite', 'Container', 'Graphics']) { const o = Phaser.GameObjects[c].prototype; o[a] = o[b]; } });
Phaser.GameObjects.Graphics.prototype.C = function (c, x, y, r) { return this.fillStyle(c).fillCircle(x, y, r); };
const CABINET_KEYS = {
  P1_U: ['w'],
  P1_D: ['s'],
  P1_L: ['a'],
  P1_R: ['d'],
  P1_1: ['u'],
  P1_2: ['i'],
  P1_3: ['o'],
  P1_4: ['j'],
  P1_5: ['k'],
  P1_6: ['l'],
  P2_U: ['ArrowUp'],
  P2_D: ['ArrowDown'],
  P2_L: ['ArrowLeft'],
  P2_R: ['ArrowRight'],
  P2_1: ['r'],
  P2_2: ['t'],
  P2_3: ['y'],
  P2_4: ['f'],
  P2_5: ['g'],
  P2_6: ['h'],
  START1: ['Enter'],
  START2: ['2'],
};

(() => {
  const HLP = 'B1 disparar · B2 saltar · B3 súper · B4 empanada · ↓ agacharse · ↑ kiosko';
  const TI = '#1d1d1f', TW = '#ffffff', TY = '#ffe45c', TC = '#f07b5a';
  const W = 800, H = 600, FONT = 'Menlo, Consolas, monospace';
  // Paleta WelcomeBack
  const INK = 0x1d1d1f, BLK = 0x171717, DK = 0x404040, GR = 0x6e6a5e, WH = 0xffffff, WS = 0xedeade, PA = 0xfffaf0,
    CR = 0xf2d49b, KR = 0xe3be7a, KD = 0xc9a060, CO = 0xf07b5a, TE = 0xb55a3c, YE = 0xffe45c, VE = 0xbfd98a, VD = 0x458d5c,
    BL = 0x1f81a6, BD = 0x17617c, CE = 0xc7e0e9, RE = 0xef4444, DO = 0xa07c2b, CA = 0x785d20, P2C = 0x9c5389;
  const ATLAS = 'data:image/webp;base64,' + 'UklGRloyAABXRUJQVlA4TE0yAAAv_8HOELfAKABARgr4eq+cUkkxE2yeAmzuarAJACANJxFoQAD6v1RwXr9cJ0wDAEhDJ_EBmSNoHMpl7jJ3Jci2qdH8MU70+P__B4z2PPW56hJaizsEaVmo1nP4Iv8M0QNNvcJXcFCMfcS1ghEAAO1zzHqGIwxDwigMGkkKs7_rXzVQqIOImAAeziWq4Nr26utmrncC8kzp4yO_dPU_wPD9aq6vBFTpOO+ARq8GxBVJ54Eibhu9UlmrYB768KZAgWqesnep3nGoXii6m_tlu+tBrh+6GmWt2N8QINJxbmXfdh6yyr71ybF_1FJ9EUJLNW9VGF4re4Fq0xERcK1i1Q_Kqp1BdY6CXiGc2F_JZ2_mkr6CwBV8Wu_aKo8VtVIXmfsChvODmaF1ZqbtzIBQKmul2goq+z4OWmkVh9ZJTdIAa2YRKHE7WqlVpkaFsFk7qih4IGXBc0sloAqKVVaKSrnnrJz9fkLauQUQYR5znmfebu3N02zbtuw7LQklBHxA6f__q7a0SnYMJOer1oj+y6JtO4Sk80QTwSUREapK65r5kCRJkiJJyyeG_z+2eaBK3bOpMqL_siDbbttmKb3RxQBKbwCi_uXttW29bW1b41xCXgRLdAgRWP__r5pjkKPX1kU6+dRbRP9pQZIstm32xa8K9COwg1vogRTEMhPGH5IkSXIbabUWgMEW+_+vUqFRFRWwuXVF9F8WJEmO1fTJHC8AXefDzMi7r7__89+SDsctpMDkkhi8FP8tpACFTHP2v3ADKWCZL4nMbB4FLGWL+r5G8LKBFLBKugrjFlIwqjHJ1buBFOi6zFtIgaqLtg2kAFUSKddu2kIKTL7FrnUuh1bbR8Fmcs3Momi1hRSwgtyzpi2kANZlM4VTzTvI1TpfNpCCI6jh3EIKaJeK_yZS4Jp37txmXj7Hsg1s00yyhOtRgcahatYR1SAb38_mPiW1ajtUAHComnUc8yAb3o8nUl61MXeoAOBRNeuI5kE2uh8PI+ZI2b9HBRqHqllHNA+y8f1cJl7SgSyrWPhXMgcHMuNctllHNA+yFfCzlYhDsejI0JKUPMG5bLMOaB5kK+CnQ2G9xBpVVIFjQs+yrcwgG9_PZ4g4pNWjjTKmlHq5LAXnsi3rLds8yMb38xHRFXySvyDatDWIJDuifiLOgkMqOJdtWW_Z5kE2vh9PUCKiS61wvfrjUGMihrRCEN1CdQQV5rJ1YsdscD+jg5yS5pysTNyckrVpKoU6uoOKLKVgL9s_PdhtOWTj+_mEGk+s72DGysStqIGbJlYYVJz1shgEQ_LI2tf2vy2HbHg_oQgcbWdHJg6iZiliHJum4hdHfoRJKIYO7LYcstH9ZCYCrGhzZOLBzI1cSDo2TR6siDKY2CWHbHQ_XvGZKxO_kQJh5qZpim_R+gFWVGAFQ+gZIGVI27B4fmT10XYzoCm3LQ+DM4ACKgggxJvWAYH8MoGi60IuJIWGNVHpSlvJY4QAndcgqPVAbYNdql9KZGxJVIytzyDMldcQMYRHw5hy_fyWaBZdiqYRtoQioiFkRAsO2Qr44copllbRNctzMK0ibHmEyBPAsgHvGrR_Hc3Nh2wF_Hjuj1hqKbFFhYjoWpa8LAq8bI7RWiJLoX13yAb3U7p_x_IVVZvrLJgFrNtgl6IfYS6bxXk1Dtnwfrx5J4bk_hXLKeo210e2uW6DfcSS9UuSrBM6YjNH8xF5sKunuZvGXDa8H3LdQa_nRaxzB3PmAaCHJYRmpT+BY4IjthbeIleq9zaXDe0HvSJG4LxbbLsW6THIDdZkCZHXA8335D8mpBitAcH60cxl4_p55x1U3m1uu4iw+Aq1jeI8urJOoBFr1DtA_djzTmqdg+0PMgtDyG3UzKOjPUF1DEJvWXMy8LwTzi+DeUdQjnNsrx70ZtqKh0XVeQenHt95B5ZfFvPOMiLQ9iqiCyGjiavUO8cZE_IYROkBusghP856Z5af3xrHa_W8w3UHFL9g4B022FzXIM91Zx6wfth9R63qa+fK+to21x0dejDHdUfZfhGsO691vmalVh9mn3dO9UtA0wgTgBP2TdE1jC3ZL6x9Jyd03clbIdcvrH1nILYY74Vcv5TEzbJ4M6T65YCsVqAu1JUKqpRWYbZV0HTZmH55iAhFVZ2OEv34XiNNeHfTzjuJo_kOFPjqBMS7YQu_r6E4nZlW1WLj3Y3rCjhnVtTiwbrb41yvcLzu3c1o3lRmWnd8jXOC19HN5CtSK_iVjXK8F+30OrrpDYKpEe30MrqhHNmQbORP28uLdnod3VRd2nEqR2KcHvbyop1eRzcacC23U4MD2ql6NyVynubjVKLOrcGEdirfjYg8CpuPNRosaKf23YgmCefJr8GEdirfzeiooV9D5ix4NKKdXkY3lLSpDDXvsKnMZNxU1r8x3TwDu8yGbRBBqmETsMtk2CYRdJvmsqlM1eXpf5enyl0e2D73vJ0fN+Q3u+no7MeG1++IDcTXbfuF+sFhd6t0f22c_N5QbKjnHSQhyY0yyXlwyHxLxJS2SAd5+CNCY9jmaEgQK0px5dYobXxWrhGxOSimdA3pNgay2TZl4UYJMnXlaocMpCPQhukgP2EQquYKmkTOxz80Jg8GVUDdJHHGETL_q253NM3UTWyLhmZsfJ+sdUeqgVeCJovz8Y8K7HaHJ92QaiMLgfKd8_j8jXW_w1NCjfT8lcCJV+kL3M4PVwk1natWMGcAbdKVw7Kjr8GuwATBtA97BUAGU5M++BrAQiHQtA96_Zr8NhEMTXr3dbEF0FCdbfHTZ+AIHC6oRs9kBkCnNWqnC6DR63jyUW+LyukCzm1TWHY0Y8IYmnV+Q3TwG7AxjM83m2BOwPDN+eHck2VMe_pY7+PzPC00wIE8nyL4UuHcjYAGOpB5nTNeLJy3MdBwhsMC8zI1CJeEtG7CeRsFDXCwT+djRHW4JE3oyzLO1zhocIMNTcqKvvb0rkZCAxtsaD7W1ldhwNVYaFCDDc3HkK528p4RNDSgwcamY8Cxq328Z6CHBjOQM3YaIhgxiyKeM40zGxENZLCh6VjyCEbMUmmmcWZjokEMNjkdA8TuPdc4o65PRQMY2NkabuFx7mwnb43goqEL8LP6EKE01ThroIyGLeAP1S2cbRzstNGwBdNTsUbKzTfuec730aAFvAE6Nx+NXcjBTGb_7vHRoIXH8rTNrQnGhdKbbk2Ph48GLbSvqMGtyb42y4+Ma5pz+mjIQlcpeE23pIQmXNNzfDRkQfI+ADOHvm39mnNkRvABC98m0cL_BC3zb9+2fsk5MkfwAQtKpUp7X53dHqX6IS3J0+djrjKKBlby9Lk4qwHRXFwCcamyN9ZJjUA8_S0RP_hLEo29QRpO_pJEa2+Oxh7SnGZXnwUQJowGlFu3RWViYmmk4c3KSECQhuemt+l8DGuwNPgww3M46GSOF1SmRwX+RhgN2Ll1+xjWQGn8gV+MgV_BS6QofWvA0LDy6aaF0lDDpQbGVyvULfoUtIZG4zQ6ad2IhjVQmgsDt7RD7NQFWkOsK3nHaFiDo8kgDC2ZSVKgNIQ6uYZWDGvEaPIIX6uSuuuUbW70EJTvxbpHDBeafWvA0LDy6abF0WQQnukp+i5KwBothobtfLrpjqO5PIxpP2YiMgns953eSez3nXINF2ECpeEENKiRXoCvO3gjwdcdxBKC8r0+6YZHJt4Ghxr5hNfZIQrf7Y2uO6Xv9nrfmgCC18jrzt7runP0urNX_dYMinUHfgH1Zh2o91CUqh4LqFmRNIxivjm99rfGHareUQYWSAMp5BvUa39r3KHqtcSwQBpIoZ8llgr9CeUQbndIpkS3fKd43SH05lBudyi_UrWJ5kdqJZXs3R2XOTJN8z02WQZ97wIj9axvgQck7aZKZ356MB8NWrgLWkYK8GPKBIvWSs_8nHRkpAA_25setPAhaBkpwH+GB2ustcHWf5OOjBTgXxvbmx6wIJbzCi+L6iDMONfGO_AjkuK9wsOgNgg03rXxDkoO1A6jhhftSdJqCDKkG0m2IjUxSuTaqCLIkMTDWqtvYU+waE49lMi10XdrTHtaqNqdyivDKkszVF228dLUrY00Q9VlGy9N3doIMcg9S0uMo0uHHtozqiWRsNhO4_8CEW7UTI8smuoCEVDWPFovEOFBrUcaPXyBCLB5JydwX7YvEMHFerX1vToEmEQJvj6EGzULKaeFcBeq5ub8uyVd4_ok+M+_Ljukv5Y0fgMZKY1riLD3QyP7uv5vKQ0++SaRagbdk6aRruErBMNX9E+WRry+FLEmqdjBPQOIlYZr30lYnqTgSWocBbiwRO5w8M4A0S2lkaGvgm8GFh4aQkELV6sSnomv8CJ1HLwzwDm8lIac5wive9I0onOssLzGK2hab9OohKfvElRKA+UfYePK_INtdNPoCE8vgpWGicxVq_Hv4YWikxV1o++9xM_prxF6Eaw0aK87qsrkE54BwFPDY2Dd7PHK6EWw0rA1f4VgQDNA2DU8Npa5aexdSCOE5jFHsATNAOM5wjcIuI8X27eOZxHfinY1PI8VhDRwzZknWcAzaIyxfy_xpWegaVfD81jBSoOrqoRXzZfiC9HiCB9josHkK+HVHeHV8iT1DNaCr5GHo896oWEJD2OkQbuiThiFHapLeC2O8R8rWGmY5IjqgCgIJa76nVX40FYaMqub5KMtgs9tbZN8tEUY3+VY9vHucGMKiiP8f2mGOySKGl5rD8+IcITjX8gifHic8vbReISDpMBUoCEllgIFXZBQgYKkxK8AIKOhFGTBVqAIUmAocEK9SWMFiiAFFQo0NhpGESEwFSgiQmIpUPx5KKqQAkVESPwKADYa_Zf6m_u_okcA7gb2HY3pfccHspPN0vYFIsj8s7a1ujQEH5DBTiK_bS+j1aUhjGzyTVlGbdNYrKmMXd_XhjAI3neaMe2fbqx_fJal6WjQbndwzWcDYB+ZVx17uQmblUYMnO8L22rPiHp1VhoBvO9Mjoit4bjUrZ8IgpUGvYsVt6ktcoNvbWU0IugyWUUrpwzPdp1qGXVoFAKjvFYaJg0q3lCeviZ2LAPP_1lpiIH9+dq4YrmWuhoJ8ERvOtZEsaPwB3SICPaLlpFcRWmNHNSV50BNvHVxFhYB6uvrynwVFNfQcprK2T3IiAPR+YvNUAEiHW3wYDmMnN5pVhqmeWdfEdtbnoebtIjOBibVwQ3eW+b3zdJHQzbvXJO14ygGkfu7moFo9hX5PdO20sCpieCRyYrcdaN5TGifXzM7CQ0td_yq_flvPyb3+Y44NtHQACvxm4zobbo_b7rPH0kzii18NJTD1Oatt3EZvV2aimQQv0faRyBWGrx1B5S5JxW_v12bimOdoVhFfSsN3bwT3rcnqvjtP45RPYIxMysNFF8Ej5RluheI41ID6ItiGQ0dXwTf6CjTdbynd0axjQZRIuHm_ftSdhvpiWIfDd+wROLN+8UMbuSgnO+jIVt3sKv0v34qeYCDPV3Ot9JwzTupM_mUEVz4Lk4ElX1WGjT6uO5Z9hhVvZJCR4OJY+L+9Do3kOyG1JLrH0oaOEfFk_0wdT3Rl7oMvZN_jJIGbRjYwJ8vbSOeiJIGbd0BbOAVOXt+Q0Yp__2cVhqueSe9gZt5e7nLGDUfu600XN5DBm_hoUFXa9R3IKHBhOx183YK8OsOfDSU+45ePYefoJloWP_fwQvm7Ab4dQdWGr59p2b1TrnLwNedWmkAvbhhTDSsvuK1q3gwJhpnPA07hkr7b6HtGmtepf8XwJ+xk1xLiZVGYOfva3AtJVYaNxdSeMuuVE7e1dp4rMQ_GpVVTt7R2gjpxDn1glgEK41bNSTX160huTIkJT4aNqt+pjLdRiqAYKWBcmHS67h57CrdhYser8TeZgGVTBURV7gIVhq00nIrk6JqNvH2sfqeOxp_0lxDyR7yt_lTSsPWGcbPKDVQAiW4SnhZ95hDyL6b_ViE0ta_VikN2iW4hiP2t1_gZK9WJAK_DUQ0kGT0uu1zRISZ67aDcDIsKw3Xpb3yBsscrLNZpoJe4Glk46u+WKt7KHMZmQo6oVtKA3XhM0nLyFTQCZ+nlUZCohP+TisNHktah7RUppGk3nVwJT4zQtRQmvBWyTe5CpMRogYTXdda4jvIV+W8RnaGhoSI49ckQiM4w7UlIo5fkwiNjINU8p7YtmyIEuUg0pVQAPMbIURq6olup8ypBtOZSGIYkBr98BsQLiUigk0l3Z8ProQRokYWSrsb5CkGYCAafBHhIiJWhbQpAoiBaGRTYlgJcZrYTAXMEDTysVYrImt4CYga9mEBxuuBiHgJiBqJzDv8j3fktMoAlcb2dwuVMPc+A2AoGoa9i9ErOzRaxs5uBeiJq4+6M3ykk_7OOxI1ImgePjsZDBt2KiQZYrxV6h205kzRb8WVzMksl2XV8bgarlsJD_J7tXonpZmz0g+ROeGcpJ5Vx8NqoFwFsSoqh7ehnLiJiFXHw2rAgnz59iqvOxGaUQ5_IeQ54ESd34dMRclEQ8mclai14R1vomc8QyFXg_e541ilvEf8Cu_rTELUc58WQJEG6q6esJLMkRUvJ7+Obju4UqyGzxq2B3HG11Lia3JbZFneGL5YOTxJkpVMJOnI4Se6qVob9_A1qKq2cIMP20pQXSH2f2j3_DfwaM7apAVUQbWSBU8WUsGIlZSse96RrwH83HleQcve3PFvZJEBGrTSWW++APC7H5lKAmlDSweYmZktq8mEjpbxNYCfOy1EXXafAdl9DUCmqaSWCzMXyxruhPga_Zf7yBAUMEYcxTDKA2gDC4eUzN0yIS20N5IJFUClCqW0ksvKPXyNfgpfo13_7hcuM1U4AQEXFK5s4ZdjCSdbWoZUahDM0DhBKJQYJwhT4AgGSmbdGtsbVR7cG68ej6thK1aUWjjDCVlIqZ+IWEcJWISnZBxfQ7XueIlfM1xaKLS4w2UcSuesFHDRtFYCaaAF46AaPCMvI81wGaHFGU7IspVmRoLYuoSy9koADbRgHFYDB3+57i6OgqWhCgZxKJ2zlK7Y42Ud8DVYzXCt26NZqjyyLgFL+B2xx0s7wGoAm7XRcWGRpcoj64Kv8OmKPV7WwaDGd0m_gF+B0uJRJbGUAn4xV8EKSnp15KyDcQ25gF2kaQUgCElLFZJlKVUlPJSONK2VQPZ4lQ6eHkW_Hw6_N4BdUKENB_Goqgqyfty6g9imbIw+iv5o4HHktcRBPKqqg2DaK3EHKc7G2KMQHIhdDCMO4lFVFyT9cAepKswGTmO0+7X4tfi1sFVx81RfZgMS5rBEqkK7ORp6OBuw3lkp9ZbwE2lFHmPIYkhja7G90d18jTH9usMMyjJh2CYRZHveOY4nsbJJBI1pi7JMGLZJBI3pLuK4jKKWpoRDMghkSEEuVQnLeN7wxSJYMn7s2GgNuVTRkmGlIfvcAUbgChqkZUuo0gG2XWTcCbh1eLotzSovdqxr9wgb974j036l2TcYfs+SWlhhM5Xfdjlu2unMiBCD3jE_ES6i2NZhZyxRODHozbaUh9NnwxD8uHDJndA75Uca7No4eGvIp3+L5NtkMBlsNkcpYzvNYMbJDKi5ck1Xg6lF30pMOdvh1RHPNXY7cU_ZXp_E7L+N6h3s6b+U7S20thAkKSHtx8JpK0EzMJ4eZng0SJo7vHe3eVB1CrwoJgeTwaRnAJBaPBomyUf3X07_b6SjUangIDHUA6bxM2krGh0aEgX7T034L+JmUacA6w4QvjTmQ+up01bYZ2t+6_Vah7Q1zjuTpOfLQtcvA4AyA3o1RNPMfcJh3i8GWbeMUopBL1TvtBGuO3T4Wwg2uFxZGUShlCK9qhX4uLC9QDzTbwu0G+lOgR+qlFETbkUmg8lBkLfrGOaweF+w7sAj7ZNcgGjbwEeDzwc4rjAmSpmzxIRGUyhVSA_wjkPLzfyV6tHtfMgN0ycpZSDjWnjjaTYpj2ieEHmHg7gMSzP7TDRfbthP8F6_sB8gOhG0K24r8t6LId47zQDH9QyOLzOg12_R8VBM127V7x5YNj5Oo48m_ATFcFNjTErB5OjR7AMxqBdYaU5hxXnY_EJUzNCMM5n8QD2ucw3uegfFOJWQAal8wZFAXB0BxxPIakrEvOUapozqeoeY0LkEmbsEmkEE0mFrjNAKLL039d4Qg5JTWd8oEO9hh8YTaF1A4j2CU8bK4fq97kS8N8CgBse7M_LQ7TZl9BCu2+dPvf6EuIhBa_LIuGawoHfznjIa1jt0axyXSWVA6_DIdjdnEOnMegexNzc_q1KOW5zfPWESac5D5DOeGdTgEMRbq0auctpxi1O5TzpOZUCtW_ewZhAY8s5QYV3OO06Syn3qcd5BRYzD29d5ugtihdTswTubXSr32cd5Bonjr2T1eIeEhgB21jtPa85MjUaLdO9mtONmMsk5uzb1DuEhdFyhUPhk2kzm8Y416x3Dw9ZvogcieGtEdEGPglhuqTxvNjPBlTt10OC84+iQ93Le8Z+IsSWR7cqdOvgI1x2Iz2ecRpJNwonPerxypwqcp3yA645IsiVrWeNlOyunsAdeU_ARrjvM6zWNDVnlL7ZzHNl42X6fl1PVsqoPPi_3aetru1+1G4gAWoQUS05kptacmVPrvINofWruof1xOhSAduxUVKbiIu5GS2rYp7ha90_eSvTyaevbHFHhff+o3q4sbTU1__f69BFJ8_81VHvs9jUQdRtYT2vY58RNjGQbWHTJn4lPyu1Log20yFuMVBtYPHwW+dRKq9G2FXD_atNXIzag0ffy3GIGmke2J0liA_cYadSz1peaP62OxkOB1ofrS5_1wyIPBZaHl+79ymk8NFR69+7frNEk3MCyfdi+2SY2oGgmzM0JsQHNTPKXJLGBe4w0WrB23ePgcy_fpjKxAcCP+tycEBsAPIK_T_4SG7jHSKMNQ8bCDSx63vFeGzyxAYB_1OaE2IBGVrQ82WIGDxHSqOHWiy27vOyibi9ctdP1SMreG_RVBFftdEWOxabdyu1DXHf4BFvhqp2+wHXHdUnsYfqJZGtS9r2l9V1EGdSYxHsnZ5u0+lWwPIlxiit3ql2H_6b9VsBy38at27jvEu7p1CK5cqfAddgs3nKvstcqW1wJ9SSTT4vgop12T0vFdORqSdCjfC5c876akHHynOBVO3VQJhI0U2E7FVj5Kmhlik+uFDvwzoFWKmyoAilXze553YEJqnSklQpBF5Zy7p96h_9qQCQaiind1C7kztBpaMeTXwFPDKDnlvYa91ssQQ1FPTJIaX+qcTHsSUFV97znWjfi1o0wb2lcBDzpllC+47xvJPQuIkAXWPl+42YgRIAulPKdBW6wiyBFXnJvqoKG218EeSPXq3c0lO8tIvV43oF_b5pEUk2pnVIwg6iEND7ceUe90pP2Byv7+k0RrgiwEadm56SnpKVShUt0UN5owe43EGPT0fiA152Q_L5GUv5g5Q+ncyrhpACD74jH8Ag5JRHHUmmO7BJOCrBI38N31Kf7DYTYdDQc15111sW_t0C6Rmj_oER+yGJECAEGKTOTakokFSKuI0IIcBCKahRis9FAoI4b79GH_3u47lTl72YeL7Ldc8l7df6L40u+YwrVlHQOn1jimjOlltnB1W5v__EZY7PS6PPT2iLeASp_x3k8zntR_gvSxMAEj_J3HU7m8QbXCJ27V5TNSkP1vOOmJPN3K4+HeS_IfxFDEzzO3+ek83izhHfVuXtzhhdh89FAO5_IHA74Q0YneHilFpiBfYS31bc_v4+w6Wj4iCgm9hexkdd3CQf8YZqoqq2E3ZpUDi927XD_bubwqiC5cwoZYvPRABbbvFpEnnDRTn2Oljm1KC7ZKdEyQgufFs0VOzUaoVVq+X3FToc4+zSbT4uKkSt3Cnu0oI6SFtPFp0UUxK_cqYn49P12uW+KqLpypyZHckyNSt+Co33lTlmabX2aK3eq6sKC4489ffFpEffrcN1OaV3a1b4KCZfslNZl+BjWxSZYe30I61iGg9d0L6gPPvMvC7cc3HhdEDl1V5P2ZzGtofjvfIZ9SOMSJO9ms6_wDnO_2I872FsMu5E1L_jctahhDV7v1bTeoSB21wqv+PvYvzDI8jEM7D08XdR0Uvu_4cDn6eLfqHUvyCD2PrEaVUOr0rShSTzdVpVIjo7QpmxC2a4jIrHBIHUkYfLcd7R_V4gID7uux_GhoPR+062znLGo+nPx5bXSOJvE0qTwQ2BYQ5NFaEk1LQ7KDA3Hqtp3SK+j7GGq4RQRoXgU01n+bW9WV2qPg9IZsRuCJLiR4N3KkaPCaErXkaVD3XH0vgUOxa5Ybqo4F1PMxY7Us+5oMGpwf3ZKRwg4pk0Q5HM8EyAvg4EcfOShCpWMsQac+8cwM0g1KkizeoeewBF0jwdKtkO94+1jWFO+AM1alfGOJgUckqZZkAqNYFKH4qoQb0GtEGUXpHt8JEaIbEr6IcfGmMty_xCt0XfiYTwuWwZ_MjS+ucZquRZTTMW2gvfrkzllg+4dAbDJgmzzzFsluWAJJq3qHbfDaJv0A0mEJmVgxVard9hUM9Z6T15OTttlROJYw5T4VweY5tagt2mWps1SHLkdWh_C88_XuE06cnecd5pf2aTN+CLTkKRAhtkArzu9vTF7lXQIvKFzggoEJUSYYgO87vxWae80V6p406H0CNnBokBIOdyY5WwU3ngy9L3rkCaCLF0FZbcCaWJ5IR17gcqW431nDCbRFxQchBwhgjZQsEC86fA+Ajnlk4CplkSJktwiWeB7yZX8S+42boNsJ+AtORjU9_xLpp0GONqwRwsDaEhrFmEHSJF02Iq86jQ7m_Bzi7V8yvw6s+6WmyWE2yyswWaCOD2MIbQb10ki3ICvO5uVkUmqVAK3KnG_nzgH_eFGxq8DSfMINpPTcBoRbnVFS8NAckPe91vRUBziUBgidiSuCw7lAaPA_gkuQdi3iAOGHQ_4JUl9THuN+UVo1C80ROcQcyMcRDXT9mideAw99QdRAxR3_Tq1q4lLfd3xvYZIf5RpagNwYj9kWmW1aj9vhKfYJozF8HW7cukRm4UVGxXsvUXuGsjcdN6KiNg7dNfa4dT9lm+bkMCBVRz5veLrTisvItjQLfz_S1X3rztt6cU13oM5MCiEl+X+GuAXIaiFRzTdVdEs6FRdu7FETYuqqVnTO+Lt0New_0QkmIz4n8AqmGXtTuwukdBu9HBjRCGiaZC2_EfhbhVk09I6K9hMGSu4wpob2F_sTTxWO2x3squ+1VDQ_8Bh1wXv7WD54YcCiZ30RZyhO6va03jvu+j9NEM8ROvkgeQKctv_BOLNFBaHUEidvCDRmiRb9uxLVjgBZpxu5VspLA4BUDo5IBEZYRM9fwwhwOtD2cT0t+nhnDXt8NxvFbtbYlgcAiJ0MkDiMMLmroPxaOO0iIVYTwSezNsth2hBmxtuXOsPi0MY6JwMkgiMsGmJ8FJL4AmnvU_4qT4sDlFFd_m9+AQJZIQdRsiWHIEBag+LQ1TTXXovPklSfIRt_7JJqi7D9hxpqXzdtE6BJkeHCV65sDhEE7rL7sUBJJVH2MQqx5CqjBRFJ+Ln1ke44O9iBMWd8dvIO6u0brJS8LKFxSGa0V1yLw4iKT3Cprv3IWX9hZNgJunba9ASxuy3z1D5h_PbdVx61GNdbKczXrKwOERTusvtxYEkVUfYnGMkL2kaCxGRsXWaWpPUud9wlCMc1OuEvFxh8QnM5BeY4OVllNqLg18lICOsTAMmEJQ3VFOtc9dB+vMR4S2VNNPZmOOc2LYHc8KqLtvgIlRZmb346LeWfZix14ucEbaHTi9MES4eNTpjt3GKsENGBGKE_Y+AOv8SA+p8NG1GchIMi7vLbQ3oLrEXv9Q4fNQ0DxhHv3kREPaOVaRE_fjCMKPNBEkRhEx7DXzbXKpBPfJjcxz1FIiV6h0kYfF1VdNDR2hejNtPIAkuYn1hUVfesSbHfXNhJpJLctxqj93DSYyzz4A3TlQSGchHJkiDey0a27q0e+T4LCD5J2C_iKKZsx9IogdJGK2xPzlRyUcQ9UqL22+Aawvs2yYSzolHpxP0sLg3It1hPgjKfigJBZJUoaWbSkbDpLKQSciQScsFSfnPuVPp1CrInYbwURmIdLYtBoT_nj+HkQF1eBrssLg3IGljI2MfQgIZYdt0caS1A3E5owshbqw8TgE7dhclkZXpFP0TsCI5oS6PA6MSKXA3yGFxb1S6cXsxiAQywjaBCgIHUC8_rSFiH7JIqJwkhA__wsPkY2oB5R7ZcelG7cUwEsgI2xQiR30sWcOk4e5jATA7TdHpZfLCavY2CGBsfLtdAhlhK+scxE8AUzUUP32wkPYXk8HQgFMtUcHeDokZG0HI6hedcvK0puQvp5R+DyEl7S_EOUNnD2t0ulsjST+7RSLGxvXw6q+Nsxkj7HEMLCZPz1SFs7XjGBMXTyusH5ZO7_e2feqCM_rv2ctG5yD82Eh3W77uUQjwGeTwUnGOukYlNe0uIiKiyWfgcT7X57y+ibmuMQMtV3c_AuYcmz+gfo9ApfgvIqL0FwWW_8DRK9vDaEvU3QtAeBsSuTZNInA7j0jKkdq1aYpO5TohWJ8f956PEc+4dQT3e5qs49OzxWKmLOAmsD818din4Fl0PgURsbNwfHiu9bnJjo_MpXyuSaI+Mwi5WnjcSoiWFs+HZ98QN89HZmM+dxTuD8_WChwtzOcqQPRBgcmFkmGbgLX0m5t8ajLlc1fRo60BTl8tIXlAp6zbAbexqZI+K978h9y3NZI2KtXTx5R85ju01ijx+PcoGX3bTj3zDTxuZrKPf4pS0X8b8ok4mnEMac6_f53621Z_BzLft8v4FvMzrukyaMhgMKVeYEbPKtaBt_fVmVhMl0FDBoMp9QKPAf7AL3WDWKWL+TnHnpsdi5dBQkaDGfXijgHRYfM6XWQ4zC07XmYJGV1no16So5i0+jKEy1oJyiwg48F8ekmOYtYq+QqA+_g8MKCKEUsmypFPL0lRWKuPVyC8lChGMJkmRz69JEXBrL4MlXf1LQgqTSbJkU8vSVFIq4kPsvM6ElatV1sRVJ5McCTo9JIUBbVaVLlh7dRxQ6keqVisCCpPJgDT6SUpCmyVJLuvRcKQGEVQeTIBmE4vSVFYq+rfdHnvtUg1t+hLB1VDxh8JPr0kRWGtniJK01Et0qgGt2mCSpMJcuTTS1IU1upJNKmLWqTVyG_0_H3iReGxTqJJfdQi7Vjy9l7ibVpqRJMJpNPrFBS89_KnEXiZBUMEOfLpJSkKa3VoQPDeC4QVfygeLXmggpMJHkfo9Mo_ZIhqIHsvEmnd5IYgRgIyQY58ekmKwlo9kawcLXjvBXS0UASVJxPkyKeXpCisVXH7IXWO8XaPOl9iB8kIINPnSKAXquMaHB2k2hvNCJ17q0nH0YEgqASZPEc+vSRFCVp9WUKin+nJiskIJLNVOfLpJSkKa5UjXxImrpCMaE2LVTny6SUpCmyVrHD8kwL1kFZrnWgGyTp5wXMk1EtSFNKqOu3cfxBHmUewUjTHyRzwOfLpJSkKa3WIg5_4rxSoBt4NC6x34MssIONzpNNLUpSY1ZZkLLG1HCFywTOCoKJkCjxHPr0kRaGsop4VObbDMzSdJHyZUTLSkhz59JIUhbXKr+evtydmiW2I76E+rZSMSDKulY58ekmKAlptA2XvpWe1yp98mXkyAZhOL0lRSKvVJHylAP2nYplS0UFNaSYA0+klKQpttQ+GKlCpBj_akQhZ3EkS1EEufDisPhJarLa0XJKiCKzWgvg6kuM4JWDPr6Cwsmrl0mYqdB1znYbqrqpJirXnvNJzwUcZXMd6CF9HMk5MB6ZfUq5Wyf0R0T4iztMecEnunWw4R1G1DnKdnYvAOkSgdkQDEnbqsKjIyh+BLpNHchRCe8RViF7NF0l5nR2r7TjXybmiWEOvZMyOaET63kuHPfkr9lwQIkfHtCHp5dJ8eGl2M5yjiFp1mOs34ApiDSIMOm3_izLm7716_8Yvaavwbx27n0dki7NyXS4S5IiIoVy_AVcEawQhIsfjkqpu5e+9zIrKWgZbCeDWAJ57OzKuBOwMp1RVeI6Gswxw9bnOzxXDGkUYc+p5XLaVAPZeFkFDECzjsznj9_OYjO2KZLM_+vO8DDmyNlt_9Fy283NFsbYBhIg8797rI22nDg4kKV1b1pH7GTuu0sDm2e2+DHCOQl5tF3dczs8FYPXeLxDix_EqQ5L3XnOcFRioM3dcpUNqvh3eKFGO_lXshWBlmWolhOfx0brXN5C9l0+1SlszUucol2urwnMUxSrYK4xlqa20Ct57_Z03bamMB+BzNK6be7nS5GihsDWMDXxkNEpFwHEvU_Dea_iA_zoovC9SzFNozwMjSIdlxSY3aQG8I3il7L2iTFycSJIe+ELzSodlyIY7bUzK3stHxJ3KRbwQg_Rnbiw+m03i916jddKsHNGwBkFuLCk21imp3L2X1Aw2t44jWsq8pdRYNmwrMKFK33sVg4cOI9pernRYhmy0U0oZe69_QqsXxARn7kyG5ciWzGn43gtUwlHhuUpEow_FSPJY_G7D98qolc1p8N6LPYNN69ZobLTQhJLjq_nAYrVZ1+tzK2avJ7Kl15xaKyrtYHJLX42WaAFVdh4qkgtqGq61hou1zdcJRG6f5YG4XiTlTl9FaIc0blBHKqpikoYrTSePFixzfUrsx44P4+peri5op8cdD5n2E8tiiHykncP3awRkeia8hnln_1FcS7umS06_prZvXJmkhkYUFSY2rocTwJI46RbeK_tOl9Yx6ccg9gGCz5d2TWBUrXpbyaQSB7aFVku2vw+Sc60c6c3iMfs7Xc5I1VxtG3VNlTok5uZa58imfSpJJ86b3J_xC9aZApXiPv6ui_Y6qNIU3+nooT0ksdKKnCNQiq6M+6mKE6XNuYAV+Xbaf1_nK5OBkDexP1q_W6mVVoavoIjVGrskimdFe_KMZyfi+pW5cP48KYSji6rUewrqGThE1fyqWP1fmNp5NtD9mtb9DCx7GeByIveXgLl4psKCb7l_wCIy4itocPaM51jW2lox0l89aI22zD+gbpKJr9UajgCXkwT+fqIQUcN0cdt0qfkNTWvA4nYk8MfT5RHJDysq4cpFfa57hEfO85ofqb+_GKh_u0V6H0MRaBOwo5XLSdCfUgGYjhxtO3Iq1DwwoKorJh0nNcz746kQSaFNQZmFO9KPcr5GMchOa1f0Kmy_1y5taqakJMIW6uBEuyldguXusuXuwXX_EXspxf3xVFANL6BslC6KH1lfZsZskCdW_ENoZoCXgCRor8PcxsR7XaIFaEgV48X0PIrEWJAH3YZFkVKVnyxwjRj3p50mkmjpW_2VLaLzMNhu4lK+kxdSDvI9LeHok_ipYrohzElY+L1HsngaviMViRSvlND+0kPPw5slejJEyh904InWOnrEk60F4FMyPOe2zzGp0kXB3MlOvQJFADAn9xeh9+9FncmTEOmJfEeA60nTC4YQl9FVZImHIv3pv1DtjxJgBiliBQeGufn5WujDAhVHGs3ULdEIrFxOlP68hwv+lvIEvhBzPz1yEnxFuBqiPPFw35H+OESEfhFG+rPgkfMxL_pyIIeM9heFFrodkXKTSfPRtVvX9D7CCVjN5UTmj+7jhaoJFc8LkoFBwg2ejKhZL+g3VVzN5SwTjIOZnAT4hz4renZ0GS44WUMB3U_8LO5eF1zv42jtY4_cwJw8ViJPQycANV_LIARZOGqbjlCFxSNzCg90Ji+fD+qPmvTn4phb5moFq570_TfsYiypffvoWlAf8yY2eh9HSVnGE4DkZH1U_X+F8lRxbIJ28bJyF3DLLBdjMzwCEYFA0aQB2UufBCXpL_wt0rvl8Vzm6REBO1PxhxJgRphnA4dPOUQSgORknWrF8mTyME0d4ZlMGvlr+JUj0CbeETpcl70RLKQ_H+Sc14ioZ5CrUEtYjz5vJmUwAbbtowQAOVlrqq9_mDyNiEaf4B5yO_BwnMARqIHjjvsVS+bmgaP74XPi_nRyxBPSrUsVpPD3iAhDy56tpOISEHf39avRwuUplE_EKQzQ0SY4AoV4DLce4Ti1p99exwT3xyg46h1VdtVX+knbQQkw1oF5is9PpKdFsvjC2fKoRgP5pb2oWosPuZA2tL8TQ7Tsesc3ehNhUABeiL3tZoN5Cp6f6iD2aMIXXnAgPAUzSZHPwK+SgaElUretcPW8X1YiAEBOmLsND2HQ8lcTsusdRVWTZcVTnXdKjEGMt9xD+S9AS7i5NONSwYPx5wryZl04AFhOHiuXpyMNGdPfW+8kpmk2qocsSSyWACefsJa+YcQbhwkAZ4_1F86nF9Dl8FRnecVLfFD6srWYwDoKRFt9+r+JQC4AnD3En1oV_z2oangvPwFYSy+Xzn5e_qQVs1B93SGt6w51IsNJDGh50fTyGXp8LgtVf3h8RfiyBnKzuDefT8KPY1xs3y9zrNeh+g_mJJe_QJ5sNrCt04pdt22xP+y6gw2O10j9wesJNP6cN7y0heHq335J4nIS96dZ2KqOrf_KLeT0R0q3jT2ZLBVr64soBxoQhq02559qjvi2Yn9tfcGCGQyP2hItcTMkh9qYebZ3a+tvpy+g+LNAGKbanHm2d2vrb6cvlmQIw+5JXRjELbXTF5rJKAxHkLJCUNDCvhstvCJiiG9C_Q+rENXrLBG51BY4jOC98JG7udRmPpJM1ta_pr5A5xAYDIfalLm2d2vrb6cPg4IcZT3Gu723OU_YLJfAMLY9joifgYIfLM2tlvs7vqU1bwreBV+Zaf39R0M+D6pBPyE90mN46P+_i3SaOc6lvRj84EK2H8FkUt_RovzGf+wB9y0Jyi4+Ikj18_STB0kX06zfMol_BC_GnNJJvYkio1YBhx_EgYnfwy4gx74iN3PxGSJyh3TxE6dCTBKqj5vkcZC3ppE5FxNvnFSrQHwFj8+FAymI6w6AGKq3j5AdxT1OZRCA8tNmzxntWoPf8YrX2AXksJqrg0fESUPdisKsXKbh1wPmJ85kMoOUYL5krkHcI1xWIMlOeau3LQOv+Ww6miuhteCSKTsBGKQgk2AZMM3kBY8W_dQX1BAkxoRET3G63mGvflvWJVdGwKoHNS0x4t79urRLroK9_n15F1ML7nYXob__erv_GzMf+5wAAA=='.replace(/_/g, '/');
  const F = {};
  'bg_fonda,0,0,300,112;bg_plaza,0,112,300,112;bg_puente,0,224,300,112;bg_ruta,0,336,300,112;bg_vega,0,448,300,112;boss1,300,448,96,96;f_road,0,560,200,80;c_critico,200,560,64,80;kiosk,264,560,35,75;f_mnt,0,640,400,70;c_tio,400,640,48,60;c_tokan,448,640,48,60;ch_crouch,0,710,48,60;ch_hit,48,710,48,60;ch_idle,96,710,48,60;ch_jump,144,710,48,60;ch_run1,192,710,48,60;ch_run2,240,710,48,60;ch_run3,288,710,48,60;ch_run4,336,710,48,60;ch_shoot,384,710,48,60;ch_up,432,710,48,60;bot_broken,0,770,40,44;bot_fire,40,770,40,44;bot_w1,80,770,40,44;bot_w2,120,770,40,44;o_shield,160,770,8,30;crate,168,770,30,25;trk,198,770,36,24;dron1,234,770,40,22;dron2,274,770,40,22;vol,314,770,16,20;o_esc,330,770,14,20;qlad,344,770,28,16;chancho,372,770,32,15;quiltro,404,770,28,15;roof,432,770,80,14;brl,0,814,14,14;o_mz,14,814,13,10;o_fl,27,814,10,10;coin,37,814,9,9;o_pb,46,814,9,9;o_emp,55,814,12,8;o_viga,67,814,40,7;o_eb,107,814,7,7;o_mb,114,814,9,6;o_gb,123,814,6,6'.split(';').e((t) => { const a = t.split(','); F[a[0]] = a.slice(1).map(Number); });

  // --- Entrada ---
  const K2A = {};
  for (const [code, keys] of Object.entries(CABINET_KEYS)) for (const k of keys) K2A[k.length === 1 ? k.toLowerCase() : k] = code;
  const held = {}, hitq = {};
  const kc = (e) => K2A[e.key.length === 1 ? e.key.toLowerCase() : e.key];
  addEventListener('keydown', (e) => { if (AC && AC.state === 'suspended') AC.resume(); const c = kc(e); if (c) { if (!held[c]) hitq[c] = 1; held[c] = 1; } });
  addEventListener('keyup', (e) => { const c = kc(e); if (c) held[c] = 0; });
  const hit = (c) => { if (hitq[c]) { hitq[c] = 0; return 1; } return 0; };
  const im = (s, x, y, f) => s.add.image(x, y, 'a', f);
  const h2 = (k) => k === 'S' ? hit('START1') | hit('START2') : hit('P1_' + k) | hit('P2_' + k);
  const flush = () => { for (const k in hitq) hitq[k] = 0; };

  // --- Audio ---
  let AC;
  const tone = (f, d, type = 'square', v = 0.05, to = 0) => {
    if (!AC || AC.state !== 'running') return;
    const o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime;
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d);
  };
  const noise = (d = 0.4, v = 0.2, f = 900) => {
    if (!AC || AC.state !== 'running') return;
    const n = AC.sampleRate * d | 0, b = AC.createBuffer(1, n, AC.sampleRate), x = b.getChannelData(0);
    for (let i = 0; i < n; i++) x[i] = (rn() * 2 - 1) * (1 - i / n) ** 2;
    const s = AC.createBufferSource(), fl = AC.createBiquadFilter(), g = AC.createGain();
    fl.type = 'lowpass'; fl.frequency.value = f; g.gain.value = v;
    s.buffer = b; s.connect(fl); fl.connect(g); g.connect(AC.destination); s.start();
  };
  const ding = () => { tone(1320, 0.12, 'sine', 0.1); setTimeout(() => tone(1760, 0.3, 'sine', 0.1), 90); };

  const G = { two: 0, score: [0, 0] };
  const KEY = 'welcombate:scores';
  const load = async () => {
    let v;
    try { const r = await window.platanusArcadeStorage.get(KEY); v = r.found && r.value; }
    catch (e) { try { v = JSON.parse(localStorage.getItem(KEY)); } catch (f) {} }
    return Array.isArray(v) ? v.filter((x) => x && typeof x.n === 'string' && x.s > 0).slice(0, 10) : [];
  };
  const save = async (v) => {
    try { await window.platanusArcadeStorage.set(KEY, v); }
    catch (e) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (f) {} }
  };
  const ts = (z, c = TI, o) => ({ fontFamily: FONT, fontSize: z + 'px', color: c, fontStyle: 'bold', ...o });
  const tx = (s, x, y, str, size, col = TW, ox = 0.5) =>
    s.add.text(x, y, str, ts(size, col)).O(ox, 0.5).J(TI, mx(3, size / 6));

  // --- Escenarios dibujados por código (alta resolución, con parallax) ---
  const sky = (g, h, c) => {  // degradé por franjas con colores de la marca
    const st = [[0, c[0]], [0.45, c[1]], [0.7, c[2]], [1, c[3]]];
    for (let y = 0; y < h; y += 4) {
      const t = y / h; let i = 0; while (st[i + 1][0] < t) i++;
      const a = st[i], b = st[i + 1], k = (t - a[0]) / (b[0] - a[0]);
      g.fillStyle(Phaser.Display.Color.GetColor(...[16, 8, 0].map((s) => ((a[1] >> s & 255) * (1 - k) + (b[1] >> s & 255) * k) | 0))).fillRect(0, y, W, 4);
    }
  };
  const scenery = (s, M) => {
    const gs = s.add.graphics().Z(0); sky(gs, 470, M.sky);
    const L = [[250, 140, 'f_mnt'], [450, 160, 'f_road']].map(([y, h, f]) => s.add.tileSprite(0, y, W, h, 'a', f).O(0).Z(0).U(2));
    if (M.night) L[0].N(0x6a6a90);
    const V = [0, 1, 2].map(() => im(s, 0, 226, M.mid[0]).K(2).O(0).Z(0));  // 3 copias; cada tramo muestra el lugar que toca
    return (sx) => {
      L[0].tilePositionX = sx * 0.04; L[1].tilePositionX = sx / 2;
      const q = sx * 0.55, n = q / 600 | 0;
      V.e((v, i) => { v.x = i * 600 - q % 600; v.R(M.mid[(n + i) % M.mid.length]); });
    };
  };

  // --- Boot ---
  const Boot = {
    key: 'B',
    preload() { this.load.image('a', ATLAS); },
    create() {
      const s = this, tex = s.textures.get('a'), src = tex.getSourceImage();
      AC = s.sound.context;
      for (const n in F) tex.add(n, 0, ...F[n]);
      // a2 = chef del J2 (ciruela): recolor de la chaqueta azul
      const cv = s.textures.createCanvas('a2', src.width, src.height), x = cv.context;
      x.drawImage(src, 0, 0);
      const d = x.getImageData(0, 0, src.width, src.height), a = d.data;
      const SW = { 2064806: [156, 83, 137], 1532284: [117, 62, 103], 13099241: [232, 215, 228] };
      for (let i = 0; i < a.length; i += 4) { const c = SW[a[i] << 16 | a[i + 1] << 8 | a[i + 2]]; if (c && a[i + 3] > 250) { a[i] = c[0]; a[i + 1] = c[1]; a[i + 2] = c[2]; } }
      x.putImageData(d, 0, 0); cv.refresh();
      for (const n in F) cv.add(n, 0, ...F[n]);
      s.scene.start('M');
    },
  };

  // --- Menú ---
  const Menu = {
    key: 'M',
    create() {
      const s = this; flush(); s.par = scenery(s, MIS[0]);
      s.add.rectangle(400, 300, W, H, INK, 0.45);
      tx(s, 400, 110, 'WELCOMBATE', 84, TY).J(TI, 12);
      tx(s, 400, 172, 'los chefs de welcome back recuperan La Vega', 17);
      s.m = tx(s, 400, 240, '', 24, TW); s.md = tx(s, 400, 285, '', 16, TY);
      s.c1 = im(s, 320, 460, ('ch_idle')).K(2.2).O(0.5, 1);
      s.c2 = s.add.image(480, 460, 'a2', ('ch_idle')).K(2.2).O(0.5, 1).X(true);
      tx(s, 400, 500, '↑ ↓ jugadores · ← → modo · START: jugar', 16);
      tx(s, 400, 532, HLP, 13);
      s.draw = () => { s.m.T(G.two ? '2 JUGADORES · COOPERATIVO' : '1 JUGADOR'); s.md.T(G.prac ? '◀ PRÁCTICA: todas las misiones, sin ranking ▶' : '◀ ARCADE: tu puntaje entra al ranking ▶'); s.c2.V(!!G.two); };
      s.draw();
    },
    update(t, dt) {
      const s = this; s.par(t * 0.08);
      s.c1.R(('ch_run' + (1 + (t / 110 | 0) % 4))); s.c2.R(('ch_run' + (1 + (t / 110 + 2 | 0) % 4)));
      if (h2('U') | h2('D')) { G.two ^= 1; tone(520, 0.05); s.draw(); }
      if (h2('L') | h2('R')) { G.prac ^= 1; tone(660, 0.05); s.draw(); }
      if (h2('S')) { G.score = [0, 0]; G.m = 0; G.unl = G.prac ? 3 : 0; G.carry = null; ding(); s.scene.start('W'); }
    },
  };

  // --- Misión ---
  const GY = 520;
  // Misiones de la isla Chile. wv: [x de cámara, enemigos (b robot · s escudo · j saltarín · d dron · k kamikaze), ¿bloquea?]
  // cr cajones [x, alto] · rf toldos [x, y] · tu torretas · ki kioskos · po POS escondidos · ho rehenes · b jefe [nombre, sprite, escala, tinte]
  const MIS = [
    { c: 'SANTIAGO', n: 'LA VEGA', L: 5400, sky: [BL, CE, PA, YE], mid: ['bg_vega', 'bg_vega', 'bg_puente', 'bg_puente', 'bg_plaza', 'bg_plaza', 'bg_vega'], z: ['LA VEGA', 'PUENTE MAPOCHO', 'BARRIO YUNGAY'],
      wv: [[250, 'bq', 0], [800, 'bbd', 1], [1400, 'bqjd', 0], [2050, 'sbdd', 1], [2650, 'jqkd', 0], [3150, 'sbbk', 1], [3850, 'sqjdk', 0], [4350, 'ssbjdk', 1]],
      cr: [[640, 1], [700, 1], [700, 2], [1500, 1], [2150, 1], [2210, 1], [2210, 2], [3000, 1], [3640, 1], [3700, 1], [4500, 1], [4560, 2]],
      rf: [[1180, 390], [2420, 390], [2600, 330], [3320, 390], [4180, 390]], ki: [1900, 3560],
      ho: [[1260, 390, 'c_tokan', '¡Pa\' que se coma un choripán!'], [2850, GY, 'c_tio', '¡Lo de siempre, cabros!'], [3400, 390, 'c_tio', '¡Con harta palta!']],
      b: ['LA GRAN CAJA', 'boss1', 2.4, 0], t: 'Los robots de El Crítico tomaron La Vega.\nOjo con los quiltros ladrones: te roban\nlucas. Revientalos para recuperarlas.' },
    { c: 'TALCA', n: 'LA CATEDRAL', L: 800, sky: [BL, CE, PA, KR], mid: ['bg_plaza'], z: ['LA CATEDRAL'],
      wv: [[60, 'j', 0], [330, 'jd', 0], [660, 'j', 0], [990, 'jj', 0], [1320, 'jd', 0], [1650, 'jj', 0]],
      cr: [], rf: [], ki: [700],
      ho: [[400, GY - 660, 'c_tokan', '¡Al tiro!'], [300, GY - 1320, 'c_tio', '¡Lo de siempre, cabros!']],
      b: ['QUILTRO MECÁNICO', 'quiltro', 4, 0x9a9a9a], t: 'Sube la torre de la catedral por vigas\ny escaleras (↑). Caen barriles de palta:\nsáltalos o revientalos. Arriba, el Quiltro.' },
    { c: 'CHILLÁN', n: 'RUTA 5 SUR', L: 12000, sky: [CE, PA, YE, CO], mid: ['bg_ruta', 'bg_ruta', 'bg_ruta', 'bg_plaza', 'bg_ruta', 'bg_ruta', 'bg_puente', 'bg_ruta'], z: ['RUTA 5 SUR'],
      wv: [[300, 'vr', 0], [1100, 'cc', 0], [1800, 'vd', 0], [2600, 'rcv', 0], [3400, 'vv', 0], [4200, 'ccr', 0], [5000, 'vdv', 0], [5800, 'rrc', 0], [6600, 'vvd', 0], [7300, 'cvrv', 0], [8100, 'rvd', 0], [8900, 'ccvv', 0], [9700, 'vrvd', 0], [10500, 'cvvr', 0]],
      cr: [], rf: [], ki: [], ho: [],
      b: ['CHANCHO BLINDADO', 'chancho', 5, 0xb0b0b0], t: '¡Carrera por la Ruta 5! El truck no frena:\n→ acelera, ← frena y apunta atrás. Revienta\nlos furgones de El Crítico y salta barriles.' },
    { c: 'FONDA', n: 'TIRO AL BLANCO', L: 800, sky: [BLK, BD, P2C, TE], night: 1, mid: ['bg_fonda'], z: ['FONDA LA WELCOME'],
      wv: [[60, 'bb', 0], [90, 'bkp', 0], [120, 'bbb', 0], [150, 'bkkd', 0], [180, 'bbbp', 0], [210, 'bbkkd', 0], [240, 'bbbbkp', 0]],
      cr: [[370, 1]], rf: [], ki: [700], ho: [],
      b: ['EL CRÍTICO', 'boss1', 2.4, 0xc9a0ff], t: 'Tiro al blanco en la fonda: el joystick\nmueve la MIRA, B1 dispara y B2 salta para\nesquivar. No le dispares a la pareja de cueca.' },
  ];
  // Armas: S salsa (base) · M mayo (metralleta) · P pebre (escopeta) · F merkén (lanzallamas)
  const WP = { S: { n: 'SALSA', cd: 0.16, v: 760, t: 'pb' }, M: { n: 'MAYO', cd: 0.07, v: 800, t: 'mb', sp: 0.16, a: 150 },
    P: { n: 'PEBRE', cd: 0.45, v: 700, t: 'gb', k: 5, sp: 0.12, life: 0.75, a: 30, d: 1.2 }, F: { n: 'MERKÉN', cd: 0.045, v: 560, t: 'fl', sp: 0.08, life: 0.6, a: 220, pierce: 1, d: 0.6 } };
  const SHOP = [['MAYO · metralleta', 300, 'M'], ['PEBRE · escopeta', 400, 'P'], ['MERKÉN · lanzallamas', 600, 'F'], ['PODER LLENO', 200, 'O'], ['+1 VIDA', 1200, 'V']];
  const Play = {
    key: 'P',
    create() {
      const s = this; flush();
      const M = MIS[G.m], LEN = M.L, par = scenery(s, M), cam = s.cameras.main, TOP = GY - 165 * 12;
      s.children.list.e((o) => o.D(-1e4));  // el fondo siempre atrás (en la torre los y son negativos)
      const fx = s.add.graphics().D(900), hudG = s.add.graphics().Z(0).D(2000);
      let sx = 0, lock = 0, wave = 0, clock = 0, stop = 0, time = 99, state = 'intro', ST = { k: 0, h: 0 }, LD = [], boss = null, endT = 0, bossOn = 0, zone = 0, shop = null, df = 0.7;
      const P = [], E = [], B = [], PT = [], HS = [], IT = [];
      const lb = (x, y, m, c = TI, bg = TW) => tx(s, x, y, m, 12, c).setBackgroundColor(bg).setPadding(6, 3).J(TI, 0).D(1500);
      // plataformas: cajones y toldos (se suben desde abajo)
      const plats = M.cr.concat(G.m === 1 ? [] : [[LEN - 720, 1], [LEN - 600, 1]]).map(([x, n]) => ({ x, y: GY - 50 * n, w: 60, hp: 4, sp: im(s, x, GY - 50 * n, ('crate')).K(2).O(0).D(GY - 50 * n + 49) }));
      M.rf.e(([x, y]) => { s.add.rectangle(x + 6, y + 20, 6, GY - y - 20, CA).O(0).D(y - 1); s.add.rectangle(x + 148, y + 20, 6, GY - y - 20, CA).O(0).D(y - 1); im(s, x, y, ('roof')).K(2).O(0).D(y); plats.push({ x, y, w: 160 }); });
      if (G.m === 1) {  // Talca: toda la misión es subir la torre de la catedral
        s.add.rectangle(140, TOP - 60, 520, GY - TOP + 60, WS).O(0).D(-6e3).setStrokeStyle(4, INK);
        for (let i = 1; i <= 12; i++) {
          const y = GY - 165 * i, e = i === 12, x = e ? 300 : i % 2 ? 0 : 140, w = e ? 500 : 660, lx = e ? 340 : i % 2 ? 600 : 180;
          plats.push({ x, y, w }); s.add.tileSprite(x, y, w, 14, 'a', 'o_viga').O(0).U(2).D(-5e3); s.add.tileSprite(lx - 14, y + 14, 28, 151, 'a', 'o_esc').O(0).U(2).D(-5e3);
          LD.push([lx, y, y + 165]);
        }
      }
      const drop = (x, y, k) => IT.push({ x, y, vy: -300, vx: 0, k, sp: lb(x, y, { M: 'MAYO', P: 'PEBRE', F: 'MERKÉN', O: 'PODER' }[k], TI, TY) });
      // kioskos (tienda) y POS escondidos (easter eggs)
      const kio = M.ki.map((x) => { im(s, x, GY, ('kiosk')).K(2).O(0.5, 1).D(GY - 3); return { x, tip: lb(x, GY - 172, '↑ KIOSKO', TI, TY).V(false) }; });
      // rehenes
      M.ho.e(([x, y, k, m]) => {
        const h = { x, y, k, m, free: 0, sp: im(s, x, y, (k)).K(2).O(0.5, 1).D(y - 1) };
        h.b = lb(x, y - 140, '¡AYUDA!'); HS.push(h);
      });
      const mkP = (i) => {
        const p = { i, x: 120 + i * 70, y: GY, vx: 0, vy: 0, face: 1, on: 1, cd: 0, inv: 2, hp: 5, lives: 3, dead: 0, pw: 0, w: 'S', ammo: 0, cash: 0, recoil: 0, sh: 0, gr: 10, drop: 0, cr: 0 };
        if (G.carry && G.carry[i]) Object.assign(p, G.carry[i]);  // lo que traes de la misión anterior
        if (G.m === 2) { p.tk = im(s, p.x, p.y, ('trk')).K(3.2).O(0.5, 1); p.mt = 1; }  // Chillán: arriba del food truck
        p.sp = s.add.image(p.x, p.y, i ? 'a2' : 'a', ('ch_idle')).K(2).O(0.5, 1);
        P.push(p);
      };
      mkP(0); if (G.two) mkP(1);
      // HUD
      const hud = [0, 1].map((i) => ({
        sc: tx(s, i ? 786 : 14, 24, '', 22, TW, i).Z(0).D(2001),
        lv: tx(s, i ? 786 : 14, 50, '', 12, TI, i).Z(0).D(2001).J(TW, 3),
        wp: tx(s, i ? 786 : 14, 98, '', 12, TY, i).Z(0).D(2001),
      }));
      const tZone = tx(s, 400, 22, 'MISIÓN ' + (G.m + 1) + ' · ' + M.c + (G.prac ? ' · PRÁCTICA' : ''), 12, TW).Z(0).D(2001);
      let pz = 0; const tPz = tx(s, 400, 300, 'PAUSA\n\nSTART: seguir · B2: salir al mapa', 26, TY).setAlign('center').Z(0).D(3001).V(false);
      const tBoss = tx(s, 400, 552, M.b[0], 12, TW).Z(0).D(2001).V(false);
      const tTime = tx(s, 400, 52, '', 28, TY).Z(0).D(2001);
      const tBig = tx(s, 400, 200, '', 44, TY).Z(0).D(2002).J(TI, 9);
      const shout = (m, c = TY, d = 900) => { tBig.T(m).setColor(c).K(1.4).A(1).setAngle(-4); s.tweens.killTweensOf(tBig); s.tweens.add({ targets: tBig, scale: 1, duration: 180 }); s.tweens.add({ targets: tBig, alpha: 0, delay: d, duration: 300 }); };
      let cT, cB, cF; const card = s.add.container(0, 0).Z(0).D(3000);
      card.add([s.add.rectangle(400, 300, 580, 290, INK), s.add.rectangle(400, 300, 574, 284, PA),
        cT = s.add.text(400, 186, 'MISIÓN ' + (G.m + 1) + ' · ' + M.c + ' · ' + M.n, ts(22)).O(0.5),
        cB = s.add.text(400, 258, M.t, ts(14, TI, { align: 'center', lineSpacing: 6 })).O(0.5),
        s.add.text(400, 340, HLP, ts(12, '#6e6a5e')).O(0.5),
        cF = s.add.text(400, 400, 'START: ¡a la carga!', ts(20)).O(0.5)]);
      // panel del kiosko
      const sp = s.add.container(0, 0).Z(0).D(3000).V(false);
      const spT = s.add.text(232, 196, '', ts(16, TI, { lineSpacing: 10 }));
      sp.add([s.add.rectangle(400, 300, 380, 300, INK), s.add.rectangle(400, 300, 374, 294, CE), s.add.rectangle(400, 170, 374, 40, BLK),
        s.add.text(400, 170, 'KIOSKO welcome back', ts(16, TW)).O(0.5), spT,
        s.add.text(400, 428, '↑ ↓ elegir · B1 comprar · B2 salir', ts(12, '#17617c')).O(0.5)]);
      const drawShop = () => spT.T('Lucas: $' + shop.p.cash + '\n\n' + SHOP.map((it, i) => (i === shop.sel ? '▶ ' : '  ') + it[0].padEnd(22) + '$' + it[1]).join('\n'));

      // partículas: fuego, humo, chispas, escombros, casquillos
      const part = (x, y, vx, vy, life, c, r, kind = 0) => PT.push({ x, y, vx, vy, life, T: life, c, r, kind });
      const boom = (x, y, k = 1) => {
        noise(0.35 + k * 0.15, 0.25 + k * 0.08, 500 + 400 / k); cam.shake(120 + k * 90, 0.004 + k * 0.004);
        for (let i = 0; i < 10 * k; i++) { const a = rn() * 6.28, v = 60 + rn() * 160 * k; part(x, y, cs(a) * v, sn(a) * v - 40, 0.3 + rn() * 0.3, rn() < 0.5 ? YE : CO, 6 + rn() * 10 * k); }
        for (let i = 0; i < 6 * k; i++) part(x + (rn() - 0.5) * 30, y, (rn() - 0.5) * 60, -40 - rn() * 60, 0.8 + rn() * 0.6, GR, 8 + rn() * 12 * k, 1);
        for (let i = 0; i < 8 * k; i++) part(x, y, (rn() - 0.5) * 420, -150 - rn() * 300, 1.2, rn() < 0.5 ? DK : GR, 3 + rn() * 4, 2);
        for (let i = 0; i < 8; i++) { const a = rn() * 6.28; part(x, y, cs(a) * 380, sn(a) * 380, 0.15, WH, 2, 3); }
      };
      const shot = (x, y, vx, vy, own, o = {}) => B.push({ x, y, vx, vy, own, life: o.life || 9, d: o.d || 1, pierce: o.pierce, g: o.g, hitL: [], sp: im(s, x, y, 'o_' + (o.t || (own >= 0 ? 'pb' : 'eb'))).D(950).K(2 * (o.sc || 1)).X(vx < 0) });
      const spawn = (k, x, y) => {
        const bot = 'bsj'.includes(k), e = { k, x, y, vx: 0, vy: 0, hp: Math.round({ b: 3, s: 6, j: 2, d: 2, k: 1, c: 2, r: 1, q: 2, p: 999, v: 8 }[k] * (0.8 + df * 0.4)), cd: 1 + rn() * 1.5, fl: 0, t: rn() * 6, face: -1, bot };
        e.sp = im(s, x, y, (bot ? 'bot_w1' : k === 'c' ? 'chancho' : k === 'q' ? 'qlad' : k === 'p' ? 'c_tio' : k === 'r' ? 'brl' : k === 'v' ? 'trk' : G.m === 3 && k === 'k' ? 'vol' : 'dron1')).K(2).O(0.5, bot || 'cqprv'.includes(k) ? 1 : 0.5);
        if (k === 'v') { e.tx = x < sx ? 160 : 620; e.sp.K(3); }
        if (k === 'p') { e.vx = x < sx + 400 ? 55 : -55; e.sh = im(s, x, y, ('c_tokan')).K(2).O(0.5, 1); }
        if (k === 'j') e.sp.N(0xffb08f);
        if (k === 'k') e.sp.N(0xff8f8f);
        if (k === 's') { e.sh = im(s, x, y, 'o_shield').K(2).O(0.5, 1); e.shp = 6; }
        E.push(e); return e;
      };
      const coin = (x, y, v) => IT.push({ x, y, vy: -280, vx: (rn() - 0.5) * 120, k: '$', v, sp: im(s, x, y, ('coin')).K(2).D(960) });
      const kill = (e, i) => {
        boom(e.x, e.y - (e.bot ? 40 : 0), e.k === 'd' ? 1 : 1.3);
        stop = 0.05; coin(e.x, e.y - 40, { b: 100, s: 250, j: 150, d: 150, k: 100, c: 80, r: 20, q: 60, v: 150 }[e.k]); if (e.k === 'v') drop(e.x, e.y - 70, 'MPF'[rn() * 3 | 0]); ST.k++; if (e.loot > 1) coin(e.x, e.y - 50, e.loot - 1);
        G.score[e.by || 0] += { b: 100, s: 300, j: 150, d: 150, k: 120, c: 120, r: 50, q: 150, v: 400 }[e.k];
        if (e.bot) { const d = im(s, e.x, e.y, ('bot_broken')).K(2).O(0.5, 1).D(e.y - 2).X(e.face < 0).N(e.sp.tintTopLeft); s.tweens.add({ targets: d, alpha: 0, delay: 1500, duration: 500, onComplete: () => d.B() }); }
        if (e.sh) e.sh.B();
        e.sp.B(); E.splice(i, 1);
      };
      const near = (x) => P.filter((p) => !p.dead).sort((a, b) => ab(a.x - x) - ab(b.x - x))[0];
      const die = (p) => {
        if (p.inv > 0 || p.dead) return;
        if (p.mt && rn() < 0.5) return void (p.inv = 0.5);  // el truck blindado aguanta la mitad
        if (--p.hp > 0) { p.inv = 1; p.hurt = 0.25; p.vy = -220; p.on = 0; tone(300, 0.15, 'square', 0.05, 120); cam.shake(120, 0.006); for (let i = 0; i < 6; i++) part(p.x, p.y - 60, (rn() - 0.5) * 200, -rn() * 200, 0.4, RE, 3, 2); return; }
        p.hp = 5; p.dead = 1.6; p.lives--; p.w = 'S'; p.vx = -p.face * 160; p.vy = -420; noise(0.5, 0.3, 300); tone(400, 0.5, 'sawtooth', 0.06, 80); cam.shake(200, 0.01);
        for (let i = 0; i < 14; i++) part(p.x, p.y - 60, (rn() - 0.5) * 300, -rn() * 300, 0.6, i % 2 ? CO : RE, 4, 2);
      };
      const ground = (o, prevY) => {  // suelo y plataformas (una sola vía: se cae desde arriba)
        if (o.y >= GY) { o.y = GY; o.vy = 0; return 1; }
        if (!(o.drop > 0)) for (const c of plats) if (o.vy >= 0 && o.x > c.x - 10 && o.x < c.x + c.w + 10 && prevY <= c.y + 2 && o.y >= c.y) { o.y = c.y; o.vy = 0; return 1; }
        return 0;
      };
      const give = (p, k) => {
        if (k === 'O') { p.pw = 100; return shout('¡PODER LLENO!'); }
        if (k === 'V') { p.lives++; return shout('¡+1 VIDA!', '#bfd98a'); }
        p.w = k; p.ammo = WP[k].a; shout('¡' + WP[k].n + '!');
      };
      s.tick = (dt) => {
        if (state === 'play' && h2('S')) { pz ^= 1; tPz.V(pz); flush(); }
        if (pz) { if (h2('2')) s.scene.start('W'); return; }
        if (state === 'intro') { if (h2('S')) { state = 'play'; card.V(false); flush(); tone(660, 0.1); } return; }
        if (state === 'res') { if (h2('S')) { if (G.m < 3) { G.carry = P.map((p) => ({ lives: mx(0, p.lives), cash: p.cash, w: p.w, ammo: p.ammo })); G.unl = mx(G.unl, ++G.m); s.scene.start('W'); } else s.scene.start('O'); } return; }
        // kiosko abierto: el juego espera
        if (shop) {
          const u = 'P' + (shop.p.i + 1) + '_';
          if (hit(u + 'U') | hit(u + 'L')) { shop.sel = (shop.sel + SHOP.length - 1) % SHOP.length; tone(520, 0.04); }
          if (hit(u + 'D') | hit(u + 'R')) { shop.sel = (shop.sel + 1) % SHOP.length; tone(520, 0.04); }
          if (hit(u + '1')) {
            const it = SHOP[shop.sel];
            if (shop.p.cash >= it[1]) { shop.p.cash -= it[1]; give(shop.p, it[2]); ding(); shop = null; sp.V(false); flush(); return; }
            tone(120, 0.3, 'sawtooth', 0.06, 60);
          }
          if (hit(u + '2') | hit(u + '3')) { shop = null; sp.V(false); flush(); return; }
          drawShop(); return;
        }
        if (stop > 0) { stop -= dt; return; }  // pausa de impacto
        clock += dt;
        if (state === 'play' && !bossOn) time = mx(0, time - dt * 0.5);
        // cámara: avanza con el jugador más adelantado, nunca retrocede; se bloquea en oleadas y en el jefe
        const lead = mx(...P.map((p) => p.x));
        if (G.m === 2 && !bossOn) sx = mn(LEN - W, sx + 300 * dt); else if (!lock) sx = mx(sx, mn(LEN - W, lead - 330));
        cam.scrollX = sx; par(sx);
        const hy = mn(...P.map((p) => p.y)), pr = G.m === 1 ? GY - hy : G.m === 3 ? clock * 60 : sx;  // progreso: altura, tiempo o avance
        if (G.m === 1) cam.scrollY = mx(TOP - 140, mn(0, hy - 380));
        df = 0.6 + G.m * 0.12 + 0.4 * mn(1, pr / (G.m % 2 ? 1600 : LEN - W)) + (G.two ? 0.15 : 0);  // dificultad: sube a medida que avanzas
        const z = sx < 1700 ? 0 : sx < 3300 ? 1 : 2;
        if (z !== zone && M.z[z]) { zone = z; const n = M.z[z]; tZone.T('MISIÓN ' + (G.m + 1) + ' · ' + n); shout('ZONA ' + (z + 1) + ' · ' + n, TW, 1300); }
        // oleadas y torretas
        if (wave < M.wv.length && pr >= M.wv[wave][0] && !(G.m === 3 && E.some((e) => e.k !== 'p'))) {
          const [, list, lk] = M.wv[wave++];
          [...list].filter((k) => k !== 'v' || E.filter((e) => e.k === 'v').length < 2).e((k, i) => (k === 'd' || k === 'k') ? spawn(k, sx + 150 + i * 120, cam.scrollY - 40 - i * 30) : G.m === 1 ? spawn(k, 120 + rn() * 560, hy - 230) : G.m === 3 && k === 'b' ? spawn(k, 90 + rn() * 620, rn() < 0.6 ? GY - 122 : GY - 258) : spawn(k, k === 'v' && i % 2 || G.m === 3 && i % 2 ? sx - 150 : sx + W + 40 + i * 80, GY));
          if (lk) { lock = 1; shout('¡ATENCIÓN!', TC); }
        }
        if (lock && !E.length && !bossOn) { lock = 0; shout('¡ADELANTE! →'); ding(); }
        // jefe
        if (G.m === 1 && !bossOn && clock % 3.2 < dt) { const r = spawn('r', 160 + rn() * 480, hy - 330); r.vx = rn() < 0.5 ? -170 : 170; }  // barriles cayendo por la torre
        if (!bossOn && (G.m % 2 ? wave >= M.wv.length && (G.m === 1 ? hy < TOP + 240 : !E.some((e) => e.k !== 'p')) : sx >= LEN - W - 2)) {
          bossOn = 1; lock = 1; E.e((e) => { if (e.k === 'v') e.hp = 0; }); shout('¡' + M.b[0] + '!', TC, 1400); noise(1, 0.3, 200);
          boss = { x: LEN + 140, y: G.m === 1 ? TOP : GY, hp: (G.two ? 150 : 100) * (1 + G.m * 0.1), t: 0, cd: 2, ph: 0, kz: 5 };
          boss.M = boss.hp;
          boss.sp = im(s, boss.x, boss.y, (M.b[1])).K(M.b[2]).O(0.5, 1).D(GY);
          if (M.b[3]) boss.tn = M.b[3];
          if (G.m === 3) boss.rid = im(s, boss.x, GY - 200, ('c_critico')).K(1.6).O(0.5, 1).D(GY - 1);
        }
        // jugadores
        P.e((p) => {
          const u = 'P' + (p.i + 1) + '_', prevY = p.y;
          p.inv -= dt; p.cd -= dt; p.recoil -= dt;
          if (p.dead) {
            p.dead -= dt; p.vy += 1500 * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (ground(p, prevY)) p.vx *= 0.8;
            p.sp.R('ch_hit').setAngle(p.dead > 1.3 ? 0 : -90 * p.face).Q(p.x, p.y).X(p.face < 0).A(p.lives < 0 ? mx(0, p.dead) : 1);
            if (p.dead <= 0) { if (p.lives < 0) { p.dead = 99; p.sp.V(false); } else { p.dead = 0; p.inv = 2.5; p.gr = 10; p.x = sx + 120; p.y = cam.scrollY + 100; p.mt = !!p.tk; p.vy = 0; } }
            return;
          }
          const mv = (held[u + 'R'] ? 1 : 0) - (held[u + 'L'] ? 1 : 0), cr = held[u + 'D'] && p.on && !p.mt && G.m !== 3, up = held[u + 'U'] && !cr, dn = held[u + 'D'] && !p.on;
          p.cr = cr; p.drop -= dt; p.hurt -= dt;
          if (mv) p.face = mv;
          p.vx = mv * (cr ? 120 : 240);
          if (G.m === 3) { if (p.cx === undefined) { p.cx = p.x; p.cy = 300; } p.cx = mx(10, mn(W - 10, p.cx + mv * 480 * dt)); p.cy = mx(80, mn(GY - 10, p.cy + ((held[u + 'D'] ? 1 : 0) - (held[u + 'U'] ? 1 : 0)) * 480 * dt)); p.vx = ab(p.cx - p.x) > 30 ? Math.sign(p.cx - p.x) * 150 : 0; p.face = p.cx > p.x ? 1 : -1; }  // galería: el joystick mueve la mira y el chef la sigue
          p.coy = p.on ? 0.1 : p.coy - dt; p.jb = hit(u + '2') ? 0.12 : p.jb - dt;
          if (p.jb > 0 && cr && p.y < GY) { p.jb = 0; p.drop = 0.25; p.on = 0; p.vy = 60; } else if (p.jb > 0 && p.coy > 0) { p.jb = 0; p.coy = 0; p.vy = -680; p.on = 0; tone(260, 0.1, 'triangle', 0.05, 520); }
          if (!held[u + '2'] && p.vy < -260) p.vy = -260;  // salto corto si sueltas B2
          if (held[u + 'U'] && (p.on || p.cl) && LD.some(([x, a, b]) => ab(p.x - x) < 18 && p.y > a && p.y <= b + 1)) { p.vy = -230; p.on = 0; p.cl = 1; } else p.cl = 0;  // escalera: se toma desde el piso, no en pleno salto
          p.vy = mn(900, p.vy + 1700 * dt); p.x += (p.vx + (G.m === 2 && !bossOn ? 300 : 0)) * dt; p.y += p.vy * dt;
          p.x = mx(sx + 24, mn(sx + W - 24, p.x));
          const was = p.on; p.on = ground(p, prevY); if (p.on && !was) p.land = 0.1; p.land -= dt; if (p.on && !was) for (let i = 0; i < 4; i++) part(p.x, p.y, (rn() - 0.5) * 120, -30, 0.3, WS, 3, 1);
          // kiosko
          kio.e((k) => { const ok = ab(k.x - p.x) < 50 && p.on; k.near = k.near || ok; if (ok && hit(u + 'U') && !E.length) { shop = { p, sel: 0 }; flush(); sp.V(true); drawShop(); tone(880, 0.06); tone(1320, 0.1, 'sine'); } });
          // disparo según el arma
          const wp = WP[p.w];
          const mel = E.find((e) => e.bot && (e.x - p.x) * p.face > -10 && ab(e.x - p.x) < 60 && ab(e.y - p.y) < 50);
          if (held[u + '1'] && p.cd <= 0 && mel) {  // cuchillazo con sartén, como en los clásicos
            p.cd = 0.3; p.recoil = 0.12; mel.hp -= 2.5; mel.hitT = 0.08; mel.by = p.i; mel.x += p.face * 14; cam.shake(80, 0.004);
            tone(140, 0.12, 'square', 0.06, 60); noise(0.1, 0.15, 1800);
            fx.lineStyle(6, WH, 0.9).beginPath().arc(p.x + p.face * 30, p.y - 60, 40, p.face > 0 ? -1.2 : 1.9, p.face > 0 ? 1.2 : 4.3).strokePath();
            for (let i = 0; i < 6; i++) part(mel.x, mel.y - 50, p.face * rn() * 200, -rn() * 200, 0.3, YE, 2, 3);
          } else if (held[u + '1'] && p.cd <= 0) {
            p.cd = wp.cd; p.recoil = 0.06;
            const gx = p.x + (up ? 8 * p.face : dn ? 4 * p.face : 44 * p.face), gy = p.y - (up ? 118 : dn ? 10 : cr ? 30 : 66), vt = up ? -1 : dn ? 1 : 0;
            if (G.m === 3) {  // disparo a la mira
              const R = p.w === 'P' ? 60 : 30, d = wp.d || 1; part(p.cx, p.cy, 0, -80, 0.2, YE, 3, 4);
              E.e((e) => { if (ab(e.x - p.cx) < R && ab((e.bot ? e.y - 35 : e.k === 'p' ? e.y - 44 : e.y) - p.cy) < R + 10) { if (e.k === 'p') { G.score[p.i] = mx(0, G.score[p.i] - 100); shout('¡OJO CON LA PAREJA DE CUECA! -100', TC, 700); } else { e.hp -= d; e.hitT = 0.05; e.by = p.i; } } });
              if (boss && boss.hp > 0 && ab(boss.x - p.cx) < 100 && p.cy > boss.y - boss.sp.displayHeight && p.cy < boss.y) { boss.hp -= d; boss.hitT = 0.05; }
            } else for (let n = 0; n < (wp.k || 1); n++) {
              const sd = wp.sp ? (rn() - 0.5) * wp.sp * 2 : 0, v = wp.v * (wp.k ? 0.85 + rn() * 0.3 : 1);
              shot(gx, gy, vt ? sd * v : p.face * v * cs(sd), vt ? vt * v : sn(sd) * v, p.i, { t: wp.t, life: wp.life, pierce: wp.pierce, d: wp.d, sc: p.w === 'F' ? 0.8 + rn() * 0.8 : 1 });
            }
            if (p.w !== 'S' && --p.ammo <= 0) { p.w = 'S'; shout('SIN MUNICIÓN', TW, 600); }
            if (p.w === 'F') noise(0.06, 0.05, 2500); else tone(p.w === 'P' ? 180 : p.w === 'M' ? 900 : 720, p.w === 'P' ? 0.12 : 0.05, 'square', 0.03, p.w === 'P' ? 60 : 300);
            if (p.w !== 'F') { const m = im(s, gx, gy, 'o_mz').D(951).X(p.face < 0).setAngle(vt * 90 * p.face).K(p.w === 'P' ? 3 : 2); s.time.delayedCall(40, () => m.B()); part(p.x, gy, -p.face * (60 + rn() * 60), -120 - rn() * 80, 0.6, YE, 2, 4); }
          }
          if (hit(u + '4') && p.gr > 0) { p.gr--; B.push({ x: p.x + p.face * 20, y: p.y - 80, vx: p.face * 270 + p.vx * 0.5, vy: -420, own: p.i, gren: 1, g: 1, life: 9, hitL: [], sp: im(s, p.x, p.y - 80, 'o_emp').K(2).D(950) }); tone(400, 0.1, 'triangle', 0.05, 200); }
          // súper: Onda Pebre (barre la pantalla en la dirección que mira)
          if (hit(u + '3') && p.pw >= 100) { p.pw = 0; p.beam = 0.7; shout('¡ONDA PEBRE!'); noise(0.8, 0.3, 1500); cam.shake(500, 0.008); tone(200, 0.7, 'sawtooth', 0.06, 1200); }
          if (p.beam > 0) {
            p.beam -= dt;
            const y0 = p.y - 66, x0 = p.x + p.face * 40, x1 = p.face > 0 ? sx + W + 40 : sx - 40, w = 26 + sn(clock * 60) * 6;
            fx.fillStyle(YE, 0.55).fillRect(mn(x0, x1), y0 - w, ab(x1 - x0), w * 2).F(PA, mn(x0, x1), y0 - w * 0.35, ab(x1 - x0), w * 0.7).C(YE, x0, y0, w * 1.2);
            E.e((e) => { if ((e.x - p.x) * p.face > 0 && ab((e.bot ? e.y - 40 : e.y) - y0) < 70) { e.hp -= dt * 14; e.by = p.i; } });
            if (boss && (boss.x - p.x) * p.face > 0) boss.hp -= dt * 30;
          }
          // animación
          const fname = p.hurt > 0 ? 'ch_hit' : !p.on ? 'ch_jump' : cr ? 'ch_crouch' : up ? 'ch_up' : p.recoil > 0 && !mv ? 'ch_shoot' : mv ? 'ch_run' + (1 + (clock * 12 | 0) % 4) : 'ch_idle';
          if (p.tk) p.tk.Q(p.x, p.y + ab(sn(clock * 30))).X(p.face < 0).D(p.y);
          p.sp.R(fname).setAngle(0).Q(p.x - (p.recoil > 0 ? p.face * 2 : 0), p.y - (p.mt ? 58 : 0)).X(p.face < 0).D(p.y + 1).A(p.inv > 0 && clock * 20 % 2 < 1 ? 0.4 : 1).K(p.land > 0 ? 2.15 : 2, p.land > 0 ? 1.85 : 2);
          if (G.m === 3 && !p.dead) fx.lineStyle(3, p.i ? P2C : RE).strokeCircle(p.cx, p.cy, 14).lineBetween(p.cx - 24, p.cy, p.cx + 24, p.cy).lineBetween(p.cx, p.cy - 24, p.cx, p.cy + 24);
          // rehenes
          HS.e((h) => {
            if (!h.free && ab(h.x - p.x) < 40 && ab(p.y - h.y) < 12) {
              h.free = 1; p.hp = 5; ST.h++; h.b.T(h.m); G.score[p.i] += 1000; p.cash += 300; ding(); shout('¡LIBERADO! +$300', '#bfd98a');
              const k = 'MPFO'[rn() * 4 | 0];
              drop(h.x, h.y - 80, k);
              s.tweens.add({ targets: h.sp, x: h.x - 400, duration: 3000, delay: 1200 }); s.tweens.add({ targets: [h.sp, h.b], alpha: 0, delay: 3200, duration: 600 });
            }
          });
          // POS escondidos
          // ítems y monedas
          for (let i = IT.length - 1; i >= 0; i--) {
            const it = IT[i];
            if (ab(it.x - p.x) < 36 && ab(it.y - (p.y - 30)) < 50) {
              if (it.k === '$') { p.cash += it.v; G.score[p.i] += it.v / 10; tone(1600, 0.06, 'sine', 0.05); } else { give(p, it.k); tone(880, 0.08); tone(1320, 0.15, 'sine'); }
              it.sp.B(); IT.splice(i, 1);
            }
          }
          // contacto con enemigos o jefe
          E.e((e) => { if ((e.bot || 'crqv'.includes(e.k)) && ab(e.x - p.x) < (e.k === 'v' ? 60 : 34) && ab(e.y - p.y) < 30) { if (e.k !== 'q') die(p); else if (!e.loot) { e.loot = 1 + mn(p.cash, 150); p.cash -= e.loot - 1; shout('¡QUILTRO LADRÓN! -$' + (e.loot - 1), TC, 900); } } });
          if (boss && boss.hp > 0 && ab(boss.x - p.x) < 100 && p.y > boss.y - boss.sp.displayHeight * 0.8 && p.y < boss.y + 5) { die(p); p.x = mn(p.x, boss.x - 130); }
        });
        kio.e((k) => { k.tip.V(!!k.near && !lock); k.near = 0; });
        // ítems caen (monedas rebotan)
        IT.e((it) => { const py = it.y; it.vy += 900 * dt; it.x += (it.vx || 0) * dt; it.vx = (it.vx || 0) * 0.98; it.y += it.vy * dt; const gy = (plats.find((c) => it.x > c.x && it.x < c.x + c.w && py <= c.y - 10 && it.y >= c.y - 12) || { y: GY }).y - 12; if (it.y > gy) { it.y = gy; it.vy = -ab(it.vy) * 0.4; } it.sp.Q(it.x, it.y + (it.k === '$' ? 0 : sn(clock * 6) * 3)); if (it.k === '$') it.sp.scaleX = cs(clock * 8) * 2; });
        // enemigos
        for (let i = E.length - 1; i >= 0; i--) {
          const e = E[i], t = near(e.x); e.t += dt; e.cd -= dt; e.fl -= dt;
          if (e.y > cam.scrollY + 760) { e.sp.B(); if (e.sh) e.sh.B(); E.splice(i, 1); continue; }  // se quedó abajo en la torre
          if (e.hp <= 0) { P.e((p) => (p.pw = mn(100, p.pw + 8))); kill(e, i); continue; }
          const d = t ? ab(t.x - e.x) : 999;
          if (G.m === 3 && e.bot) {  // galería: el robot asoma al fondo y te apunta
            e.sp.A(mn(1, e.t)).Q(e.x + sn(e.t) * 20, e.y).K(1.6).D(e.y - 200).R(e.fl > 0 ? 'bot_fire' : 'bot_w1').X(F.bot_w1 ? t && t.x < e.x : t && t.x > e.x);
            if (e.cd <= 0 && t && e.t > 1.2) { e.cd = (2.4 + rn() * 1.5) / df; e.fl = 0.15; const a = Math.atan2(t.y - 60 - e.y + 50, t.x - e.x); shot(e.x, e.y - 50, cs(a) * 230 * df, sn(a) * 230 * df, -1); tone(300, 0.08, 'square', 0.03, 150); }
          } else if (e.bot) {
            if (t && (e.k !== 's' || e.cd < 0.2)) e.face = t.x > e.x ? 1 : -1;  // el del escudo se da vuelta lento
            if (e.k === 'j') {  // saltarín: brinca hacia ti
              const prevY = e.y; e.vy += 1500 * dt; e.y += e.vy * dt; e.x += e.vx * dt;
              if (ground(e, prevY)) { e.vx = 0; if (e.cd <= 0 && t) { e.cd = 1.2 + rn(); e.vy = -620; e.vx = e.face * (160 + rn() * 120); tone(200, 0.1, 'triangle', 0.04, 400); } }
            } else {
              e.vx = !e.in ? (e.x < sx + 400 ? 80 : -80) : d > 230 ? e.face * (e.k === 's' ? 40 : 70) * df : d < 120 ? -e.face * 40 : 0;
              e.x += e.vx * dt;
              if (e.cd <= 0 && t && d < 520 && e.x < sx + W - 10) { e.cd = ((e.k === 's' ? 2.6 : 2) + rn() * 1.4) / df; e.fl = 0.15; shot(e.x + e.face * 34, e.y - 88, e.face * 250 * df, 0, -1); tone(300, 0.08, 'square', 0.03, 150); }
            }
            E.e((o) => { if (o !== e && o.bot && ab(o.x - e.x) < 34 && ab(o.y - e.y) < 20) e.x += Math.sign(e.x - o.x || 1) * 60 * dt; });
            if (e.x < sx + W - 30 && e.x > sx + 20) e.in = 1; e.x = mx(e.in ? sx + 20 : sx - 120, mn(e.in ? sx + W - 30 : sx + W + 120, e.x));
            e.sp.R((e.fl > 0 ? 'bot_fire' : e.y < GY - 2 ? 'bot_w2' : 'bot_w' + (1 + (e.t * 6 | 0) % 2))).Q(e.x, e.y).X(F.bot_w1 ? e.face < 0 : e.face > 0).D(e.y);
            if (e.sh) e.sh.Q(e.x + e.face * 30, e.y - 6).D(e.y + 1);
          } else if (e.k === 'v') {  // furgón de El Crítico: corre a tu lado, dispara y a veces te embiste
            if (e.cd <= 0) { e.cd = (2.2 + rn()) / df; e.tx = 100 + rn() * 600; if (t) { shot(e.x, e.y - 40, t.x > e.x ? 380 : -380, 0, -1, { sc: 1.4 }); tone(260, 0.1, 'square', 0.04, 120); } }
            e.x += (sx + e.tx - e.x) * mn(1, dt * 1.5); e.sp.Q(e.x, e.y + ab(sn(e.t * 25)) * 2).D(e.y);
          } else if (e.k === 'p') {  // pareja de cueca: cruza bailando, no se le dispara
            e.x += e.vx * dt; e.sp.Q(e.x - 22, e.y - ab(sn(e.t * 8)) * 6).D(e.y); e.sh.Q(e.x + 22, e.y - ab(cs(e.t * 8)) * 6).D(e.y).X(1);
            if (e.x < sx - 80 || e.x > sx + W + 80) { e.sp.B(); e.sh.B(); E.splice(i, 1); continue; }
          } else if ('crq'.includes(e.k)) {  // chancho en estampida · barril que rueda y cae de viga en viga · quiltro ladrón
            const prevY = e.y; e.vy += 1500 * dt; e.y += e.vy * dt; e.x += (e.k === 'c' ? -260 * df + (G.m === 2 ? 320 : 0) : e.k === 'q' ? (e.loot ? 320 : -230) : e.vx) * dt; if (e.k === 'q') e.sp.X(!!e.loot);
            const on = ground(e, prevY); if (on && !e.on) e.vx = -e.vx; e.on = on;
            if (e.x < sx - 60 || (e.loot || e.vx > 0) && e.x > sx + W + 60 || e.y > cam.scrollY + 700) { e.sp.B(); E.splice(i, 1); continue; }
            e.sp.Q(e.x, e.y).D(e.y); if (e.k === 'r') e.sp.angle += e.vx * dt * 4;
          } else {
            if (e.k === 'k' && e.dive) {  // kamikaze en picada
              e.y += 460 * dt; e.x += Math.sign(e.dive - e.x) * 120 * dt;
              if (e.y >= GY - 10) { boom(e.x, GY - 10, 1.2); P.e((p) => { if (ab(p.x - e.x) < 60) die(p); }); e.sp.B(); E.splice(i, 1); continue; }
            } else {
              const tx_ = t ? t.x + sn(e.t) * (e.k === 'k' ? 40 : 140) : e.x;
              e.x += Math.sign(tx_ - e.x) * mn(ab(tx_ - e.x), (e.k === 'k' ? 150 : 110) * dt);
              e.x = mx(sx + 40, mn(sx + W - 40, e.x));
              e.y += ((cam.scrollY + 170 + sn(e.t * 2) * 30) - e.y) * mn(1, dt * 2);
              if (e.k === 'k' && t && d < 50 && e.t > 2) { e.dive = t.x; tone(900, 0.5, 'sawtooth', 0.04, 200); }
              if (e.k === 'd' && e.cd <= 0 && t && d < 90) { e.cd = (2 + rn()) / df; shot(e.x, e.y + 24, 0, 220, -1); tone(500, 0.1, 'square', 0.03, 200); }
            }
            e.sp.R((G.m === 3 && e.k === 'k' ? 'vol' : 'dron' + (1 + (e.t * 20 | 0) % 2))).Q(e.x, e.y).D(800).setAngle(e.dive ? 25 : 0);
          }
          if (e.hitT > 0) { e.hitT -= dt; e.sp.setTintFill(WH); } else if (e.k === 'j') e.sp.N(0xffb08f); else if (e.k === 'k') e.sp.N(0xff8f8f); else if (e.k === 'v') e.sp.N(P2C); else e.sp.clearTint();
        }
        // jefe
        if (boss) {
          const b = boss; b.t += dt; b.cd -= dt; b.kz -= dt;
          if (b.hp > 0) {
            const home = LEN - 170, mad = b.hp < b.M / 2, f3 = G.m === 3 && b.hp < b.M / 3; b.x += ((G.m === 2 && b.t % 5 > 3.4 ? sx + 40 : home + sn(b.t * (mad ? 1.2 : 0.7)) * 110) - b.x) * mn(1, dt * (G.m === 2 ? 2.5 : 1.5));
            if (b.cd <= 0) {
              b.ph = (b.ph + 1) % 3; b.cd = (mad ? 1.5 : 2.2) * (f3 ? 0.6 : G.m === 1 ? 1.4 : 1);
              if (G.m === 1) { const r = spawn('r', b.x - 60, b.y); r.vx = -170; r.on = 1; } else
              if (b.ph < 2) [-0.3, -0.1, 0.1, 0.3].slice(mad ? 0 : 1).e((a) => shot(b.x - 90, GY - 120, -cs(a) * 360, sn(a) * 360, -1, { sc: 1.6 }));
              else for (let k = 0; k < 4; k++) shot(b.x - 40, GY - 200, -(120 + k * 90), -380, -1, { g: 1, sc: 1.8 });
              tone(160, 0.2, 'sawtooth', 0.06, 80);
            }
            if (mad && b.kz <= 0 && G.m !== 1) { b.kz = 8; spawn('k', b.x - 100, -30); shout(G.m === 3 ? '¡VOLANTINES KAMIKAZE!' : '¡DRONES KAMIKAZE!', TC, 700); }
            b.sp.X(M.b[1] === 'boss1').Q(b.x, b.y - ab(sn(b.t * 6)) * 6); if (b.rid) b.rid.Q(b.x + 10, GY - 200);
            if (b.hitT > 0) { b.hitT -= dt; b.sp.setTintFill(WH); } else if (mad && clock * 4 % 2 < 1) b.sp.N(0xffb08f); else if (b.tn) b.sp.N(b.tn); else b.sp.clearTint();
          } else {
            if (!b.dying) { b.dying = 2.5; shout('¡MISIÓN CUMPLIDA!', '#bfd98a', 2500); G.score[0] += 10000 + (time | 0) * 50; E.e((e) => (e.hp = 0)); }
            b.dying -= dt;
            if (rn() < 0.3) boom(b.x + (rn() - 0.5) * 160, GY - rn() * 200, 1.4);
            b.sp.A(mx(0, b.dying / 2.5)).Q(b.x + (rn() - 0.5) * 6, b.y);
            if (b.rid) b.rid.A(mx(0, b.dying / 2.5));
            if (b.dying <= 0 && state === 'play') { state = 'win'; endT = 2; }
          }
        }
        // balas
        for (let i = B.length - 1; i >= 0; i--) {
          const o = B[i]; if (o.g) o.vy += 700 * dt;
          o.life -= dt; o.x += o.vx * dt; o.y += o.vy * dt; o.sp.Q(o.x, o.y);
          let gone = o.life <= 0 || o.x < sx - 40 || o.x > sx + W + 40 || o.y < cam.scrollY - 60 || o.y > GY + 4 || G.m === 1 && plats.some((c) => c.w > 100 && o.x > c.x && o.x < c.x + c.w && o.y > c.y - 2 && o.y < c.y + 18);  // en la torre las vigas paran las balas
          if (o.gren) {
            o.sp.angle += 720 * dt;
            if (o.y > GY - 8 || E.some((e) => ab(e.x - o.x) < 30 && ab((e.bot ? e.y - 44 : e.y) - o.y) < 44) || (boss && boss.hp > 0 && ab(boss.x - o.x) < 90 && ab(o.y - boss.y + 60) < 110)) {
              boom(o.x, mn(o.y, GY - 8), 1.7);
              E.e((e) => { if (Math.hypot(e.x - o.x, (e.bot ? e.y - 44 : e.y) - o.y) < 110) { e.hp -= 6; e.by = o.own; } });
              if (boss && ab(boss.x - o.x) < 140) boss.hp -= 8;
              o.sp.B(); B.splice(i, 1);
            }
            continue;
          }
          if (o.y > GY - 4 && o.g) { boom(o.x, GY, 0.6); gone = 1; }
          const cb = o.own >= 0 && plats.find((c) => c.sp && o.x > c.x && o.x < c.x + 60 && o.y > c.y && o.y < c.y + 50);
          if (cb) {
            gone = 1; cb.hp -= o.d; cb.sp.setTintFill(WH); s.time.delayedCall(50, () => cb.sp.clearTint());
            if (cb.hp <= 0) { boom(cb.x + 30, cb.y + 25, 1); cb.sp.B(); plats.splice(plats.indexOf(cb), 1); rn() < 0.6 ? drop(cb.x + 30, cb.y, 'MPF'[rn() * 3 | 0]) : coin(cb.x + 30, cb.y, 50); }
          } else if (o.own >= 0) {
            for (const e of E) {
              if (o.hitL.includes(e)) continue;
              const ey = e.bot || e.k === 'p' ? e.y - 44 : 'crqv'.includes(e.k) ? e.y - 25 : e.y;
              if (ab(e.x - o.x) < 34 && ab(ey - o.y) < 44) {
                if (e.sh && o.vx * e.face < 0 && ab(o.vy) < 200 && o.y > e.y - 70) { part(o.x, o.y, -o.vx * 0.3, -150, 0.3, CE, 3, 3); tone(1800, 0.03, 'square', 0.02); gone = 1; if ((e.shp -= o.d) <= 0) { boom(e.sh.x, e.y - 30, 0.7); e.sh.B(); e.sh = 0; } break; }  // rebota en el escudo y lo va rompiendo
                if (e.k === 'p') { G.score[o.own] = mx(0, G.score[o.own] - 100); shout('¡OJO CON LA PAREJA DE CUECA! -100', TC, 700); gone = 1; break; }
                e.hp -= o.d; e.hitT = 0.05; e.by = o.own; G.score[o.own] += 10; part(o.x, o.y, -o.vx * 0.2, -80, 0.2, WH, 2, 3);
                if (o.pierce) o.hitL.push(e); else { gone = 1; break; }
              }
            }
            if (!gone && boss && boss.hp > 0 && ab(boss.x - o.x) < 100 && o.y > boss.y - boss.sp.displayHeight - 20 && o.y < boss.y + 10) { boss.hp -= o.d; boss.hitT = 0.05; G.score[o.own] += 10; part(o.x, o.y, -o.vx * 0.2, -80, 0.2, YE, 2, 3); gone = !o.pierce; }
          } else if (!o.g && plats.some((c) => c.w < 100 && o.x > c.x && o.x < c.x + c.w && o.y > c.y && o.y < c.y + 50)) { part(o.x, o.y, -o.vx * 0.2, -120, 0.3, KR, 3, 2); gone = 1; }
          else for (const p of P) if (!p.dead && ab(p.x - o.x) < 22 && (p.cr ? ab(p.y - 30 - o.y) < 30 : ab(p.y - 60 - o.y) < 56)) { die(p); gone = 1; }
          if (gone) { o.sp.B(); B.splice(i, 1); }
        }
        // partículas
        for (let i = PT.length - 1; i >= 0; i--) {
          const q = PT[i]; q.life -= dt;
          if (q.life <= 0) { PT.splice(i, 1); continue; }
          const k = q.life / q.T;
          if (q.kind === 2 || q.kind === 4) { q.vy += 1200 * dt; if (q.y > GY && q.vy > 0) { q.vy *= -0.4; q.vx *= 0.6; } }
          if (q.kind === 1) { q.vy -= 20 * dt; q.r += 14 * dt; }
          q.x += q.vx * dt; q.y += q.vy * dt;
          if (q.kind === 3) fx.lineStyle(2, q.c, k).lineBetween(q.x, q.y, q.x - q.vx * 0.03, q.y - q.vy * 0.03);
          else if (q.kind === 2 || q.kind === 4) fx.F(q.c, q.x, q.y, q.r, q.kind === 4 ? 2 : q.r);
          else fx.fillStyle(q.c, q.kind ? k * 0.5 : k).fillCircle(q.x, q.y, q.r * (q.kind ? 1 : 0.5 + k * 0.5));
        }
        // HUD
        hudG.clear().fillStyle(BLK, 0.55).fillRoundedRect(350, 8, 100, 66, 8);
        tBoss.V(!!boss && boss.hp > 0);
        if (boss && boss.hp > 0) hudG.fillStyle(BLK, 0.55).fillRoundedRect(186, 538, 428, 54, 8).F(INK, 196, 566, 408, 18).F(DK, 200, 570, 400, 10).F(RE, 200, 570, 400 * boss.hp / boss.M, 10);
        P.e((p, i) => {
          const h = hud[i], hearts = '♥'.repeat(mx(0, p.lives));
          h.sc.T((i ? '' : 'J1 ') + String(G.score[i] | 0).padStart(6, '0') + (i ? ' J2' : ''));
          h.lv.T(i ? '$' + p.cash + '  ' + hearts : hearts + '  $' + p.cash);
          h.wp.T(WP[p.w].n + (p.w !== 'S' ? ' ' + p.ammo : ' ∞') + '  EMPANADAS ' + p.gr);
          const bx = i ? 636 : 14;
          hudG.fillStyle(BLK, 0.55).fillRoundedRect(bx - 8, 6, 166, 106, 8);
          for (let k = 0; k < 5; k++) hudG.F(INK, bx + k * 30, 75, 28, 12).F(k < p.hp ? VE : DK, bx + k * 30 + 2, 77, 24, 8);
          hudG.F(INK, bx, 62, 150, 12).F(p.pw >= 100 && clock * 6 % 2 < 1 ? WH : i ? CO : YE, bx + 2, 64, 146 * p.pw / 100, 8);
        });
        tTime.T(String(time | 0));
        // fin
        if (state === 'play' && P.every((p) => p.lives < 0 && p.dead > 50)) { state = 'lose'; endT = 2; shout('FIN DEL JUEGO', TC, 2000); }
        if (state === 'win' || state === 'lose') {
          endT -= dt;
          if (endT <= 0) {
            G.win = state === 'win' && G.m === 3;
            if (state === 'win') {  // resultados de la misión
              const bon = (time | 0) * 50; state = 'res'; flush(); ding(); card.V(true);
              cT.T('¡MISIÓN ' + (G.m + 1) + ' CUMPLIDA!'); cB.T('robots destruidos  ' + ST.k + '\nclientes rescatados  ' + ST.h + '\nlucas  $' + P.reduce((a, p) => a + p.cash, 0) + '\nbono de tiempo  +' + bon); cF.T(G.m < 3 ? 'START: siguiente misión' : 'START: ver puntaje');
            } else s.scene.start('O');
          }
        }
      };
      s.pre = () => fx.clear();
    },
    update(t, dt) { if (this.pre) this.pre(); this.tick(mn(dt, 40) / 1000); },
  };

  // --- Mapa del mundo: isla Chile jugable, el resto bloqueado (como los mapas de islas de los arcade clásicos) ---
  const NODES = [[534, 236], [494, 331], [476, 387], [456, 488]];
  const LOCKED = [['SAN FRANCISCO', 144, 166], ['CIUDAD DE MÉXICO', 210, 243], ['BOGOTÁ', 282, 305, 1], ['CARACAS', 302, 281], ['BUENOS AIRES', 326, 470]];
  // América en un string: 1 carácter por coordenada (×6 px), se salta la barra invertida
  const AM = ["$)&%0%7$E$L$S)V0X3S7Q9N<N>L@LDKDKBHAFBDDDGEIGIIHHKJLKOMPNPLQJOIMFLDK@H@F>C<@=B>E=E<A:?9>7:7684400,+,'.$,", "NPPNTOVPZSZV^XcZc]aaad`g[iYnWpWrUsSuSwRzQ{R~P}NzOwOuOqPnPkQgQdNbN_L[LYLVMUNSMQ", "74E4K6R7Q9N<N>L@LDKDKBHAFBDD@@=@:?9>7:", ":?=@@@DDDGEIGIIHHJFLDK@H@F>C<@=B>E=E<A", "NPPNPOPQRRRUQYPXNVMUNS", "PNTOVPUSTSRURRPQPO", "RgSgUgWiXiWlWoWrUsSuSwRzQ{R|P{PzPyPvPsQpQmRj", "QdQcRgRjQmQpPsPvPyPzP{R|R~P}NzOwOuOqPnPkQg"];
  const Map = {
    key: 'W',
    create() {
      const s = this; flush(); s.sel = G.m;
      const g = s.add.graphics();
      g.F(BD, 0, 0, W, H);
      g.lineStyle(3, CE, 0.4); for (let i = 0; i < 14; i++) { const x = (i * 211) % 760 + 20, y = (i * 137) % 560 + 20; g.beginPath().arc(x, y, 10, 3.6, 5.8).strokePath(); }
      const pl = (v, c) => { g.fillStyle(c).beginPath().moveTo(v[0], v[1]); for (let i = 2; i < v.length; i += 2) g.lineTo(v[i], v[i + 1]); g.closePath().fillPath().lineStyle(3, INK).strokePath(); };
      AM.e((t, i) => pl([...t].map((k) => (k.charCodeAt() - 32 - (k > '\\')) * 6), i < 2 ? DK : i < 7 ? GR : KR));
      LOCKED.e(([n, x, y, l]) => {
        g.lineStyle(3, INK).strokeCircle(x, y - 7, 5).F(YE, x - 8, y - 4, 16, 12).strokeRect(x - 8, y - 4, 16, 12);
        tx(s, l ? x - 12 : x + 12, y, n, 10, '#edeade', l ? 1 : 0);
      });
      // recuadro: Chile central ampliado
      g.lineStyle(3, KR).lineBetween(296, 440, 410, 236);
      g.F(INK, 407, 37, 186, 526).F(BL, 410, 40, 180, 520);
      pl([560, 40, 590, 40, 590, 560, 496, 560, 512, 454, 524, 382, 544, 310, 560, 238], GR);
      pl([508, 40, 560, 40, 560, 238, 544, 310, 524, 382, 512, 454, 496, 560, 428, 560, 420, 478, 432, 406, 456, 358, 480, 310, 492, 238, 496, 166], KR);
      [[548, 120], [550, 200], [538, 290], [520, 370], [506, 450]].e(([x, y]) => g.fillStyle(GR).fillTriangle(x - 12, y, x, y - 26, x + 12, y).fillStyle(WH).fillTriangle(x - 4, y - 17, x, y - 26, x + 4, y - 17));
      tx(s, 500, 56, 'CHILE', 14, TW);
      g.lineStyle(5, PA); for (let i = 0; i < 3; i++) { const [a, b] = NODES[i], [c, d] = NODES[i + 1]; for (let k = 0; k < 1; k += 0.12) g.lineBetween(a + (c - a) * k, b + (d - b) * k, a + (c - a) * (k + 0.04), b + (d - b) * (k + 0.04)); }
      s.n = NODES.map(([x, y], i) => {
        g.C(INK, x, y, 16).C(G.prac ? YE : i < G.unl ? VE : i === G.unl ? YE : GR, x, y, 13);
        tx(s, x, y, i < G.unl && !G.prac ? '✓' : String(i + 1), 13, TI).J(TW, 0);
        return tx(s, x + 22, y, MIS[i].c, 11, TW, 0).setBackgroundColor('#171717').setPadding(6, 3).J('#171717', 0);
      });
      s.tr = im(s, 0, 0, ('trk')).K(2).O(0.5, 1);
      tx(s, 784, 40, 'WELCOMBATE', 30, TY, 1); tx(s, 784, 70, 'AMÉRICA', 11, TW, 1);
      s.info = s.add.text(606, 300, '', ts(13, TI, { backgroundColor: '#fffaf0', padding: { x: 12, y: 10 }, wordWrap: { width: 160 }, lineSpacing: 4 }));
      tx(s, 784, 572, '↑ ↓ misión · START jugar · B2 volver', 11, TW, 1);
    },
    update(t) {
      const s = this;
      if (h2('U')) { s.sel = mx(0, s.sel - 1); tone(520, 0.05); }
      if (h2('D')) { s.sel = mn(G.unl, s.sel + 1); tone(520, 0.05); }
      const [x, y] = NODES[s.sel];
      s.tr.Q(x - 58, y + 12 - ab(sn(t / 150)) * 4);
      s.info.T('CHILE\n\nMISIÓN ' + (s.sel + 1) + '\n' + MIS[s.sel].c + '\n' + MIS[s.sel].n + '\n\nPRÓXIMAMENTE:\nArgentina · México · Colombia · Venezuela · San Francisco');
      if (h2('S') | h2('1')) { G.m = s.sel; ding(); s.scene.start('P'); }
      if (h2('2')) s.scene.start('M');
    },
  };

  // --- Fin + ranking ---
  const Over = {
    key: 'O',
    create() {
      const s = this, tot = G.score[0] + G.score[1]; flush();
      s.cameras.main.setBackgroundColor(PA);
      tx(s, 400, 60, G.win ? '¡MISIÓN CUMPLIDA!' : 'FIN DEL JUEGO', 46, TY).J(TI, 8);
      tx(s, 400, 116, 'puntaje: ' + tot + (G.prac ? ' (práctica: no válido)' : ''), 18, TI).J(TW, 0);
      tx(s, 400, 214, 'START: volver al menú', 12, '#6e6a5e').J(TW, 0);
      s.add.rectangle(400, 400, 306, 306, INK); s.add.rectangle(400, 400, 300, 300, WH); s.add.rectangle(400, 264, 300, 28, BLK);
      tx(s, 262, 264, 'welcome back · top 10', 13, TW, 0).J('#171717', 0);
      const tl = s.add.text(270, 288, '', ts(15, TI, { lineSpacing: 8 }));
      load().then((v) => {
        if (tot > 0 && !G.prac) { v.push({ n: G.two ? '2J' : '1J', s: tot }); v.sort((a, b) => b.s - a.s); v = v.slice(0, 10); save(v); }
        tl.T(v.map((x, i) => String(i + 1).padStart(2) + '. ' + x.n.slice(0, 3).padEnd(3) + '  ' + String(x.s).padStart(8)).join('\n'));
      });
    },
    update() { if (h2('S')) this.scene.start('M'); },
  };
  new Phaser.Game({
    type: Phaser.AUTO, width: W, height: H, parent: 'game-root', backgroundColor: '#1f81a6',
    pixelArt: true, roundPixels: true,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [Boot, Menu, Map, Play, Over],
  });
})();
