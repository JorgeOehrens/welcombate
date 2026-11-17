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
  const ATLAS = 'data:image/webp;base64,' + 'UklGRuAxAABXRUJQVlA4TNQxAAAv_4HNELfAKABARgr4eq+cUkkxE2yeAmzuarAJACANJxFoQAD6v1RwXr9cJ0wDAEhDJ_EBmSNoHMpl7jJ3Jci2qdH8MU70+P__B4z2PPW56hJaizsEaVmo1nP4Iv8M0QNNvcJXcFCMfcS1ghEAAO1zzHqGIwxDwigO27YNJNnaf+qk1_5PEBETwMNcogrOrle7ACPXm4CvHP34ANQvvfo9d_wd0Lb0mCcqBYy+ECdSzT2K4Gz0SmVtS_NQNT9VUKDtG1Y72j6DQ9tHuuV+E7Y+qPNDr6LMTucNU2TM3DrmkodM2TufrKW_UVvN9XBUq3q1K5AjwCe+tqjyUrvzNsChBdQcl_lJ4DfonX7IJf0o602SU99YGMrxSlqcj5IoGM4PklDVJOkkCdPJVEFbFdQF2hZQg3aZ7J1xRS1gTQQEWmA02uIRNai4rT2qKAsgKgse+01l2BZbFXVMzvJ1oFwkJAG6Inue83tvt+3oiW3bmuciATMxL7Egyf__Vx1Sl0IOwN77vKhH9F8WbdshJJ2HJhXcSESEUlrXzActSbZdq5GkNl_YtvOfKnHx3JtrnWc4J6L_kNi2kSSxp4NxoWowvfdW9xx7vCRJkqRI0iwzdA_9_61dEJlhYXXNiOg_JDSSHEnVMKwphk4Ns9vn7YuiJElyWwfPNykJJkJw6P9_lVwsZqpn4dvejug_LbaNLEmSY7vn1Q1YGa7ZjJrq3b37_Pt__lvR_riGFJhcCpOX6r6GFKCQZZrdL1xBClimSyFnVo8ClrpG7W+ZvKwgBaxSbsK4hhSMaixy8a4gBbou0xpSoOqibQUpQJVCyqVb1pACk73YtE5112r9KJgmt5lJFK3WkAJWkFvWsoYUwLqsJn+qeQe5WKfLClLwDGo415AC2rnqvooUuOadO7eJl+8RtoFtnEhWfz0q0DhUrTqiGWTj+9k8xqIWbYcKAA5Vq45jDbLh_XiyzIs2pw4VADyqVh3RGmSj+_Ewc8oyu_eoQONQteqI1iAb389l5KXsyLqIhfss5mBHzjjDtuqI1iBbAT9bydxVy44MhaTmCc6wrTqgNchWwE+HwnqJNaqoAvuEnrCJ5Qwb389nyNyVxaONMqaUehmWijNsq47t6gwb389HRFfyRf6CaNMWEEl2RP2beRbsSsUZtlXHdnWGje_Hk5SI6FILXC_+3LWYiCGtEES3UJ1JhRm2ImWHDe5ntJNT0pyLlYmbU7JWTaVQR3dSMUup2GH7VqF2xQwb388n1XhieSdnrEzcihq4amKFScVZh8UgmZL96V39+V0xw4b3E8rE0XZ2ZOIgaq5VjGPVVPziyM80ScVSoHbFDBvdT2YkwIo2RyaenLmTV5KOVZM7K6IMRnaJGTa6H6_4zJWJ30mBMHPVNMVHdO6dqiqwgiH1DJAypM0Nz4+sPdruBjTlxrKf6AyggAoCCGHl6QDklwkUXRfySlJoWJJDro5V8xghQOc1CGo9UJuzk+qXEhlbEhVjy7M05cpriBjSo8FHrp_fNcOiSxEaYddUZAZCZkZghq2AH66c8hoVXZM8BhMVYddnijwBhA04Z6Td2xDOZtgK+PE8nnltpcYWFSKiW7nOYVHgsAWeFoksheqOGTa4n9Jjn9efbFpdJ8EkYNsKe636EWbYznReDDNseD_evBNT8vjJ6ynbVtfnbFPbCvvM66xfUmSd0BmbOZqPnF92DTRP05hhw_sh9zvo5XwVy9zBNPME0MM1hWalv4B9gjO2CGeRK7U7m2FD+0EviJk47xbrrkV5DnKFNbmmyOuB5kfx7xNSjBZAsn00M2xcP++8g8q7zXUXkRY_qdZRnEc31gkEsUS9A9SPPe+kljlY_yCTMIRcR808OuNJqn0Qesuai4HzTji_DOYdQTnOsb560KtpFE+LpuMOTj2+4w4svyzmnWVEoPVVRBdCRhMXqXfOMyblPojSA3SRIT_OemeWn98S+2vtjHDdAcUvGHiDDVbXJahz3ZkHrB_2uKOo+tqpsb425ryjXQ_mOO8o2y+C_c5LHa9ZqNOH2cedU_0SEBphAnDAPhRdYWzJfmEdd3JC5518FHL9wjruDMQW87OQ65eSvFuWH4ZUvxyQzQrUibpSQZPSJsxYBaFhY_rlITMVmflxSPTje4804Z1NO+8k9uY7UOCrExDPhi3c31Jxe_Mm9WLjnY3rBnh7SujFg3W267neYX_dO5vRtKrMtN_xPY4JXkc2k58sUfBnNsrxHtFKryOb3iAYBNFKLyMbyoGBzEYeSJZHtNLryKbqEsep7olxebe3T9rpdWSjAedyOzU4oJ2qZ1Mip3E6jDXq3BpMaKfy2YjIg7Dp0KLBgnZqn41olHAa_RpMaKfy2YwOGvo1zJwF741op5eRDaWsKkPNO6wqMzmuKuvfmG6egF0mw1aIINWwEdhlNGyVCDpPc1lVpury7X+Xb5W7XLH92fM2ftyQe3bT09nrhrd95grijznvUa8cdrdI+3rn5H5FMVE_d5CEJFfKJNdmkdlLxJTWSA+5fY3QGLY6GhLEilLeVhpfbXxXbpm5OqimdEvZhkE2cyoLV4qXpSs322cgHYFWTA_5Db1QNTfQJLI+f9WYPJlUHnWTxIojZP2jut_RMlE3uS4amrFxs1j7HalevBE0WazPXyuw+x0edUOqlSwEynWt5+ufrMcdHgtqpON9AifepCton9y6Sqrp3LSCtQJok23dLXt2DZ4KTBJMe9srANKbmvTmGsBCJdG0N73uF79NeEOTfroutgAaqqMtfvoIHEGLC6rRM1kB0GmNutUF0OhlvPio10XV6gLObVPY7WjGhDGIaa4QNh+AjcG_vVkFcwKGlfPm3BfLmHahzef4PE8LDXAgz6dMvpU_dyOggQ7kvMyZb+bP2xhoOIMZwbyMAf6KkNaNP2+joAEO5Ol8yGz2V6QJfZQ+X+OgwQ1k0EZZ0deW3tVIaGADGbQ91tZXYcDVWGhQAxm0PYZ0tZH3jKChAQ1k2OYYcOhqG+950UODGSK32GXIZOYkinhN6jMbEQ1kIIM2x5JnMnOSSkl9ZmOiQQxk5OYYIDbvrD6jrk9FAxhit9ZwDc9zZxt5awQXDV0IrtWHCKWoPutFGQ1bCN9Vt2haH+y10bAFRm+KNVIur2+_zvfRoIVwA3RuPhpPIQcTObt3j48GLUzlQjJuSjAulF7cnrbDR4MW5BU14qZkn5vVv4l7Wmv5aMiCiqngKd2LEgrc0758NGRhkd8DcGbXt92+5YyZY+GChdUELfxnAZv5T992+5ozZg6FCxaWpDTauMpOj1LdSkvxDPmYmoyigVU8Qy6yqwHRvLkE4tJkAyu5GoG4cJXAD_6SRLAzSMPJX5KIduZo7KFMZXINWQBhwmhAuXVbNCYmlkYaFutEAoI0fLw0zJ2PsAZLgw8TPIaDDuZ4QWV6VOBvhNGAd27dPsIaKI0_8Ic58Cd5yZJ1aAkYGlY+3bRQGmrwMjB_olC36FPRGhrFaXTSuhGFNVCaNwZuiUNs1AVaQ+5uyu8YhTU4mgzCEMlEkgKlIXUn1xBFWCNHk0f4WZTSd50y16SHFcVNsS4Rw4Xm0BIwNKx8umlxNBmEV3mJoYsSsESHoWHvfLrpO47m7WFMu12JyCSwP3caSezPnXINF2ECpeECFNRIL8DXHQwk+LqDWEJQbuqTbnjO5MfgVCOf8DFHiMJPG+i6U_ppH7c1AQSvkdedjXXdOXrd2YduzaDY78AvoAa7A_UVilLTYwE1K5KGUc43p4_eGndouqIMLJAGUso3qI_eGndoei8xLJAGUuq1xFKhr1AO4X6HZCp0y2cX1x1CPx3K_Q7VV2m2D8ptaqXU7N0dl3NkflJuYjPLoO8qMFJP2QIDkrqr0pmfHsxHgxZugpqRAvyYMkHQovSsL0ljRgqI1_zUhRbeBDUjBfiP8GCNreYM9b+kMSMFxDXmpy6wIJbzDC+LZi99EtT4Am4jKd4zPAxavXRKVOMLlByoDUYLbzpQpI1UkKHcSTKKEmK9IJfGUAUZinhYa+0d7AiC5tTTC3JpsDdj2oeFat2ovDM9NNIMTadtvDVjGmmGptM23poxjRCD3LJEYuxdOvT0NqHRSiRstsv4B27CmZrlvYp+TOAmoOx19A9wE67Uei+jmwXcBNi8kwu4n2st4Ca4WK_t61e3CTCFEuzbhDM1j0q6LISLUC03598t6RqnJ8l__uOyXfmLJPgCMlIapxBp77sg+3Z7bykNPnmRSDWD7knTSNfwk4LhJ_snSyNeP4pcklJt554BxErDddwJphcpeJEaRwEuLZE77LwzQHRLaWTop+KbgYWHhhA0cEWV8Ex8hxepY+edAc7hpTTkPHt43ZOmEZ1Dg81LvIHQehtoh6fvElRKA+UfYceF+Qfb0Q004ekgWGmYyFy1Gf8WXig6WVF39F1L_G37gqSDYKVB+72jqky+4BkAPDU8BtbNHi+MDoKVhq35JwUDmgHCruGxscwN_OlCGiE0H+cIlqAZYDx7+AYJt_Fi_SZJMIODuDM82whCGrjmmRdZwTMIxti+1_jSMziKO8OzjWClwdVUwmvmR_GDICZ8jIkGk6+E17aH18qL1DNQia+Rh4PPegHc4WGMNGgX1AlHYbvmEh4x428jWGmYzBHVAVkRSlz1OxJ9bCsNmcVN8tWC4HNf2iRfLQjjuxzqNt7t71iSYg__PzT97QpFDa+1hWdmOvz5a7Zb+OE+5eyjcQ0HSYGpQENKLAUKuiChAgVJiV8BQEZDKcmKrUCRpMBQ4IR6lcYKFEkKGhRobDSMMlNgKlBkpsRSoPjzUFUhBYrMlPgVAGw0+i_1N_d_QdcAXAwcdzSmjzvekZ2sliS_YBBk_lnaJF8tCD4ggx1FfhsvQ_LVgjCyyYuyHLWNx2qhMqDu7xaEQfB3pxnT_unG9P5ZL6ajQbvfwSWfDYC9Z55pa9ktaFYaMXBeF1aChCw9OSuNAP7uTI6IbcGO6ugngmClQe9ixW2JRa7w0VZGI4Iuo1W0csrwrNelFa9CoxCY5bXSMAmoeEN5+pLYsQyc_7PSEAPb86UJdbmVuhoJ8ERvObREsaPwB3SICPaLlpHcRGmNHLSV50BNvHVyFhYB6utze74GimtoOU3l7B5kxIHo_MVmqACR3jvgOxxGTu80Kw3TvLOviO0tz8NVWkRngEl13QM+uuf3zdJHQzbv3JK14ygGkfu7mHXa7Cvye6ZtpYHTEsFHFityl43mY0Hb_JbZSWhoueNXbc9_+zG5zXfEsYmGBliN32JEb+j2PHSbfyTNKLbw0VAOU6u3Xsdl9HZpKpJB_B5o74FYafD2O6DMvaj4_e3aVBzrDMUq6ltp6Oad8La9UMVv_3GM6hGMmVlpoPgi+EhZpnuDOK41gL4oltHQ8UXwnY4yXcdbemcU22gQFRKu3r9vZfcjPVHso+EbVki8er+ZwZUclPN9NGT7Hewq_W+fSw6ws6fL+VYarnkndSSfMoILH+JCUNlnpUGj9+teZcdR1SspdDSYeCx8251zgapuSIVc_1DSwDkoXuzNqmtHX2oaeiO_LSUN2jCwgr_e2o54IkoatP0OYAVvyNnrGzJK+R_WstJwzTvpFdzM28tN46j51G2l4fIZMngLDw26Wkt9BxIaTMjeN2+nAL_vwEdDedzRu+fwIzQTDevtDt4wZzfA7zuw0vAdd2pW75SbBj7v1EoD6M0NY6Jh9ZPvXcWDMdF4xbdhy9Pg+FvouMbKq_T_BfBn7CSXUmKlEdi6vyWXUmKlcXYhhT_ZlcrJp1oa15X4x0bTKiefaGmEdOJUekEEwUrjXA3J5XVrSC4MSYmPhs2in6lMt5FKIFhpoFxY9DIOj12lu3LR49XYe1lAJVNF5g0GwUqDViLXMimqZRVvZ_WeOxp_0lxDSQ95b_6U0rB1hvHjXdRACZTgKuHNumMOIX03_Vik0ta_b1IatHNwCWfs7Rc46fWKRODeQEQDSUav2_aZmWauGwfhJCwrDde5XnuTbU622SRTQS_wNLLx7C9WbQ9lbkamgk7oltJAnfm1SM3IVNAJX5aVRkKyE_4tKw0eS6pDWqqWkaTfbXAhvjCKqKG04NXInlyExSiiBhPd11Zyn+S7Mq6RnSGQFHH8nszQCM5wi0TE8XsyQyPjIJV8JubMhihRDiJdCQUwvxFCpKaeID8Ta6nBdCaSGAakRj_cA9KlRESwqYTcG0oYRdTIQu12gzzE0CEQDb7MdJGZi0LaVAE9AtHIpuSwEOIwsZkK+oSgkY+lOpmzhreAqGEflmC8HsjMt4Cokci8w__xjpxWfUGlse3dQSXMrc8AGKqGYetiDMoejZaxsTsJBvLmo+0IH+mkv+OORI0ImofvTgbDho0KSaYYb5F6B615puq34krmZJJhWXQ8robrXsKT3C9W76Q0c1L6ITInnIrUs+h4WA2UmyAXReXwNpQTN5m56HhYDViQb99e5H0nQjPK4S+EfAScqOP7kLEqGWkomWYlaml4xxvpGc9QyNXg_d9xLFLeI36H920iIeq5TwugSAN1V09YycyBDW8n_3d028lMsRo+S9gWxBlf1xpfo9tyluWN4YuVw5Mk2chIko4cfqSbIY1H8TWomtZwgy_bSVBbIfb_0B74X+DRnLVJV1AFFSULHiykgpkLKVn2uCNfA_h_53kDHXt1x7+RxQzQoJVOevUFgN_9yFSSSBsKHWDizGTZyIPQwTK+BvD_TgvRlt3PgOy+BSDTVNLKhTMXyyY+CfE1+i+XkSEpYB5xFMMoT6ANBA4pmbplQepdL41kQgNQqUIpbeSy8ABfo5_C12jXuA+XicqfgIAL8lfX8Muh+pMdLUMqNUjO0DhAKJQYBwhL4ggGSibdia3GnA6uxlEfV8NWrCi1cPoTspBSP5m5jBIQhA_J4_gaqv2Ol_w1_ZUrhRa3vxmH0mlWCrhoopVAGmjB46AaPEdejjT9zQgtTn9Clq105kgQW5dUFq8E0EALHofVwMFfrruLo2BpqIJeHEqnWUpX9HhZB3wNVjNc6vZoliqPrEvCEn5H9HhpB1gNYLM2Ok4sslR5ZF3wGT5d0eNlHQQ1_ijpF_ArUFo8qiSWUsAv5iZYQMlRB3LWQVxDLmAXaVoB8ELSUoVkWUpVCQ+lI020EkiPV+lg16Jfh+1LA9gFFdqwF4+qJi_Lx63bi23KRrRFfzTwOPJaYi8eVc1eMPFK3F4mZyPWQnAgdjGM2ItHVZsXebm9zDkxGziN0e7X4tfi18JWVVe7+DIbRcQcVkhVaDdHQw9nA9Y7K6XeEn4hrciLEWQR0nhVbjW6m68xpn_vMIOymTRslQiy_dw5jiexskoEjWlXZTNp2CoRNKa7iP0yilqa6g_JIJAhBblUFSzjOOGLIFgy9kCGFORSRUuGlYbs_w4wE1fQIC1rQpUOsPUi40LAucOP2xJWeVHsGvcIG9tf13rsVdg3GL5ZJcIqMX39tsmhsNOZmSle+sT8m+kiq60dgF8if+KlD9tRDk6XFUPj14VLboQ+Kf9Kg30rB1YL+fZvkfyYDCaDTRxfZdRiRow_mQE1V36frgZTQV9LLDXrt70TzzV2PXErWftXOLuvo3oHe_lWsg6hrCHqMpeQ9mPhtJWgGRhPDzM9GiRihPfurB5UnQIvitHBaDDqGQCkFo+GUXJWfzn9LdKhUangoDDVA6bxM2qrGh0aCgW4aoIbwlnUKcC6A4QvjfnQetq0VXDYxEv1NruyNo47k6Tny0LXL44Abh+AqpVowtpv+Jr3i0HWLd5Qbu4q9HqnlXDeIZsPIbgAZclGLwqlFOlVnYavC1uB4+x4XaHdSXcK_FKljBZ_CzIajA4aw4s+wl7W6AvWHXikfZMTEEky4KvB5wPsVxgTpcxZckSjKZQqpAc4twd6e5pXej26nQ+5YfkmpYwQfxHOeJoh5RHNJSjkwLu8LitW3wmR3cR+g_f6JfYLRLdp7YqHUJ+9GEJUzAj01zPhwZcZ0Pt36HgopoX8qKcHJhnuT6P3JvwkxeumxhyVgtExsMwyEC_1AhvNKay2Hh6fD6JixjL+TEY_UI_rWIO73mEJfyohF1DjG44E4uwIOJ5AVlMicuY7lDKa6x1yRMcSZO6SaAaZSIetMVMrsPTull4a4iWxGusbBeIadmg8gdYFJFY+YCljYX_9nney8NIAL7mwvBsjD+RnK2X04K_b5099Q5BQZUBL8pxxzaCEjva5SxmB9Q7dGsdlVBnQMjxne5gzaOmY9Q4fLLs5ZHbpb3N994SVSDhPkc94ZpBOL4iPVo2cyW79bS7lHtqnMqDoziOtGTR4+WQov0z2609Syj26z_tSFeNw9vV+3AGxQFq24J3NrpR7ep_nJbH_VawB7ytNXgAb68rTmjNL0GgtnU8z2mE1meQ8tzH1Ds1e6DhD4Y17xtVkHudcst4xPTy4iQYyeQ+idUCPgrjPvHN5M8wE31ypg4Djjl4vn+W44z+Zx0hytm+u1MFXOO9AfD6j+PtahPgTn_X4zZUqcJ7yBc47IslIlrLgsFnNFA7Acwq+wnmH83Itx0AW+YvtHI4MDtt3r5mqjlV98H15DLWbdbyUM8gEWoQUS07OjNGYzdQ67iA635pHanecDgUv1Fkqlam4yIfR2V6HTrk6j2_e6ejyacfbnNng_De1mdmLHabwf69PRN38u4ZqDymvgbjcDI7TEvY9oUhGi81g16X_NPFN2c0sNIMWsSajpWawe+FbkW+ttJll7QCcZhtmi5iBRt_Lc8QMNM_ZXiQjZvAoI412njmzz5zWeCjQc2LO3PJHizwUWCYW9fvKaTw0VHp37t+q0bDgDPbtTHJHMmIGCrHBrEoiZqCZSP6SjJjBo4w0IlCfexx8TsndkIyYAWCft6okYgaAZ_L3xd+IGTzKSCOG5SkuOINdzzuesgY+YgYA7rMqiZiBRla0vBgxg00JabTwqFL7Lg8yo9wr31rpchRln43oswi+tdIFOVQbNyv3L3He4SXQKt9a6Rucd1yXwh6mX0i2prC+dXT5NrO+1JjCRydHm7T6Q1AuEf4U31ypbjv8N+13AMqp+ntWf_vq7+XUIvnmSkHbYbN75ZRJPjNJcSbUiyw+LYIvrbR7WipmSy6WBD3K186J36spxJ88JvitlTqoE0maqZBzgZUfgihTfHOluAVXDrRSYaAKpPzZqZ7bHZigSkdaqRB0YSlf_cw7_E8DItFQTOmuNiEPpk5DHU_+THhiAj0Pj6153POa1FDUI4OU9piNi7AnBVXdc3PlTty5E+YtjYuEJ93ZXPPimu8kdK4iQBdYeW_uBkIE6EIpLwtucJtJirzkEaqCRtuXJO_kcvWOhvK2ZOnxuMP6_6AVkmpKcUrBDFoR0vhyxx31Qi_aHSzs257CXxVgIw7NTkVPSUul8lfooF5ogdQzaAubjsYXPO+E5P6WRbmDhT+czqX6kwIM9pnP4ZlySiKOpdI5sqs_KcCi7Id95o16Bk1h09FwnHfWWd_6_xCUW6Z2T0rkhyxmphBgUGYmUk2JpELEdWYKAQ5SkYKmsNloIFDPnY_sw_0YjjtV+buZx4ts91zzXp3_4viSV0yhmpLO4QtrXHOi1DI5uJHSfX9rC5uVRp+f1jbnEVD5O87jcd6L8l+QJhwbeJS_a38yjze4ZercfWbZrDRUP3fcWGT+buXxMO8F+S_CtYHH+ftUdB5vlvBuOndvdngZNh8NtPOJnP0Bd4h3Aw_P1AIzsPfwXv097u8zbDoaPiKKid1FbMzLu_oD7jBNZGaNQjUllcOLTTvcvps5vCpIdraQKTYfDWCxzatF5AlfWqnPwTKnFsVXVkp0PUJLnxbNN1ZqdITWqGX8xkqHOPswm0+LipFvrhT2bEEdJS2Wi0+LKIh_c6Um4tP343Lfkpn5zZWaHMhjCSp9Cw7kN1fKErb2ab65UlUXVhx_7OmLT4u4X4fvrZTWJa72VUj4ykppXYavYV2sgq3nh7CW67Dzmu6E+uA7_7Jw150brwlVVtvZpP0pjGao7hufYRsSXILkw2y2Fd7X3G_24wZ2Fq_dyZY3fG5a1GsB7_cKrXcoiN23wDv+vvYvDHL9Gga2Hp6+qM1J6_+GA78tF_9KrTshg9z65GI0vVqV0IYm+XJbVbI4eppmZZPKNh2ZhQEvqT0Jk9e2I_6qEJkeNt2A40NB6f2mW89yjlXVn4sfr5XG2RTWpqQfAsMamixCS2npcFBmaHiuquMO6W0pB1haOGVmKp7VdO5+ffxiNVN7HJTOiNshSYIbCd6sHHhUGE3tO7D2qDuO3rbAV3FbbW6aOFdTTNWeqWe_o8FRg4fnVulIAY9lFXhx_E6AvAwG8uUDd02oZIw14PzNWEwvzSgvYfUOPYEj6AEPlKyHescHxhLKDyCsUxnvaFLArmjCvFToCCa1q20T4hLUClF2Qfp7khwhsqnphzwGYy5_ny9ic_QdeDgermuGeAw_sXOLtXKrphirpdCMezI_LOjeEQCrzMsjW3IlucISTKLqHXMY9vjQA0X4JqVnxVqrd3h8VI6tzqOXk9Mqk4XHFsbCvzbANL8l6BM+GaHNtbbkeuj8Tnzyz9e4Tbbk5jjutH5Wkzbji0xDkgLpZwW87_RxYfU5pQ+BN3ROUIGghAhTrID3nT+SZfqo1HDRofJM2cOqQEjZ3TnLWSlceAx9Vx3SZJK1r6LsXiFNLCekowWNHcd1ZwxGMZQU7IQcIYI2ULBAXHS4I6hVLgWY6kiUKMk9iwW+l1zJr7Vqcx9ktwBnyc6gfeDXWo+lAXsb9mhpEOSlNVdhO0iVtFuLPC_NjU362bVZPuXvs9nmPjfXFO1qYU+WyZSZmsmwKFtcR5LpJvC6s1nxbKSGUuJOI+7riXPQH25k_DqQNO_JMtGYaQu40xUtDQPJDTk_7lVDbRG7ypC5IXGdcCh3GAX2T3AKwrZF7DBseMAvSepj3Gqsn4SO+o2G6Bji3IgWoppxfXQuPIae+oNsAYr7_lza1cRTfd3xo4Usf5RpagVwYS8yndNqtX7eCE+5TojF8H37aumZq4UDG5XsvUNuGsi56byTmbl16K6zwWn7Ld9WIeCGVez5veP7ThtPIljRHfz_S1X37zuNdOIS12AODPLhZf0cQ_hNCCrwiNBNFc2OTs21G3sUWlRNzZLOmR+Hvob9N7PAZMT_JlbBWdbmxO4TCe1OD3dmVjJDvbTlvwp3pyKbSOusYDNlLNAW1hxgf7k18Vjra5uTTfWthoL+A4edFny2neXNhwKJXeiLuITurGpL473vos_TDLkprQsbkiuo+_YnER+msDikQurCAYnWSjJyYFuywAEw43ArP0phcUiA0oUTEpElbKHnjyEUoPWpbGT5W_X00xfa47nfKtq+iM3ikBChCwEShyXs3LczHm2cFlEippOJJ_PnTbuMIOaGG7fxN4tDGuhcCJIILGHLNdNLloYKp61P+hl9szhkE_bwc_EACWQJO4yQkRyAAcbeLA7ZjD30XDxIMvgWNv5tk1R9hm05yrXxfdM6BZocHCZ458LikCHYw87FE0hG3sIWNrVMqcpIUXQifq59hB_4+5hJcWf8NvLOKq2brBS8bWFxyDDsIefiSSRDb2HLw_uQsv7SSXKm6NtrUBJmyt82Q+Ufzm_XcR1Qj3UxTme+ZWFxyFDs4ebiiSSjbmHnHKN4KeOxkpkztk5Ta5E6txuOcoSDdp2QtyssvoCZ_AITdG0MNRdPPiWKbGFlGjCJoLyhmmadmw7Sn48IZ6kkTGcw5zmxbQdzwqY+22AQmmyYufjsW8s+rdhxodnC9tDrhSXTxbNFZ242Tpm2z8xEHOHwM6HOv8KEOp+hTSQnybC4+9wWgD3EXHyocdqa5gHj6HcOAsLesIpUqB9fGOZoM0JKJiHjVgPfNpdq0ID82BxHPQVioXoHSVh8fc300NO0XczbTyCBQawvLOrCG9biuG8uzEjyWhy32mMPcBTjbDPgjRPVRAbykREScK9Fx9g27YjYfQHo3wHbRRTNnP2JJHoQwdY67M6Jaj6CaFda2+0GOLfAvm0i0Trx6HSCXiy+2AU2tj4Iyv5UEgpEhEDexprRsKgsZBQyZNJyQfKUmZlKp1ZBbjSEi8pAZGvb1YDw3_PncGRCHZ4Gu1h8sQNk20bGPoSkyBaWeY9HWhsQV2v0IcSNlecpYc_moiayOp2qfwRWJRfU52nBqEQK3A1ysfhiV9jl5mIQSZEtLCIqCFqAevtpC5nbkKuEqpWkcOFfehh9jBFQjsirO+xSczGMpMgWFhVRS70v2cKo4ebjCuDcaqpOL6MXNvPWBlVg2zjckhTZwibPOYifAJZmKH76YKVsL0aDIYBTK9nAWzsUs20EsdMvOuXo6YzFX06pwx5SStpeiGOGzgG26HR3jiT9vFkUsW08Dr3_bZyusYW1k4HF6BkYm3B2NhzHwqunk9YPS6f3e9s+dsGI_lfWJboG4cdG2q183bMQ4CPI6aXhGPWMSmraXGRmZshn4HE+l2dc38Rc1phA5er2I2DOMfwB9TsCVfJ_iJilvyuw_FdYemF7iFaibi8A6W1I1MY0haDdeGRRLanbmKbqVG0nTNavL_eWr4Y847aRXHfZyjo+PVsEs8wC7gL7UxPPfQpeVedLkJkbC8eH51qfm+z4yFzK55Ik6tcUQq4WHrcRomTyfHj2HXH3fGQ25nND4f7wbK3A0cF8LgJEv5BgcqGk3xCwkn865FOTKZ+bih5tCXD6agnJExqyjgOusamSPqt6+z_kudFIalSqp48J_sxnLmuNhPXXo2T0bTf6mS_QuyTq+ktRKvrDkGcX5hoVUuaff136f7b6O4TMt12f2MX8jOvoaNCQwWBKucCMXlWsG369LyWimG6DhgwGU8oFHgP8gb+rBrFIr+bnHPMqFizeBgkZDWaUizsGRIfN+_SR6TDKsONtlpDRfTbKJTmKSatvQ7pMImizgIwH88klOYpZq+Q7AO7j0xCgihFLJsqRTy5JU1irz3cgvUxRjGAyTY58ckmagll9Gxrv6lsQVJpMkiOfXJKmkFYLn2TndSRsWq62Iqg8meBI0MklaQpqtapyU2umzjtK9UjFZkVQeTIBmE4uSVNgqyTZfS0ShsQogsqTCcB0ckmawlpV_6bLe69FarlFXzqoGjL+SPDJJWkKa_WUWZuOapGiGtymCSpNJsiRTy5JU1irJ9GULmqRFqO+0ev3iTeFxzqJpvRRi7Rh0c29xH+mpUY0mUA6uS5B8NzLbyPwNgseIsiRTy5JU1irQwDw3AuEFX8oHi0ZVHAywRyhk6v+Q4Zspsjci0RaN7khiJGATJAjn1ySprBWTyQbR4PnXkAHC0VQeTJBjnxySZrCWhW3H9LW1vi+R50vsYNkBJDpcySQC9VhCQ4OSuuNZqD73mbK4ehAEFSCTJ4jn1ySpiStvi0p0c_0ZMFkBJLZqhz55JI0hbXKI98SFi6QjGgtm1U58sklaQpslWxo+ZMC7ZBWZ5loBskO8obnSCiXpCmkVXXYuX8vjjKPYKFozpM54HPkk0vSFNbqkDs__EmBZuDdsMB6B77NAjI+Rzq5JE3JWY1EMcS2coDIgM8IgoqSKfAc+eSSNIWyigYW5BCH59VykvBtRslIS3Lkk0vSFNYqf16_3gFmiA3E91CfFkpGJBmXSkc+uSRNAa3GUGXupWexyp98m3kyAZhOLklTSKvNCE4KRN8Vy1gmHVQJmQBMJ5ekKbTVPhiaQKUa_GhHMmVxp0hQg1x4d1h9JMxgK8slaYrAaislzpEcjmMB9vpJCquLVoa2UqPnOddpmIeraopiIeWzPBd8lMF9bKfCOZLjyLJj+SXlYpU8npnxEZFf2hMuye0gG87RrFhGuq7ORWCdIlALEYBgpm6Giln5E_71dJEcIUt7xlXJo5pvkvI+B9jsdF2cK4sVOsmYhQhCPvfSYS_+ii0XhMjR+dKmpMOlefPWLDOcoxmx0kzXA3AlsYIIQafxvyijfu7V2zf+SFuE37ZYnyOyxVm1h1wUyFEflStdD8CVwYogZOR4XFLNHf3cy1lRXcpgLQHcA2Du+0hcBdgZTmnOiecoXMURrmOu63PlsKIIMaeex2XbSIG5l1XQkARhfIUT73NMxnpFslmP4z6vQo7OTluedbhs1+fKYj0HEDLyXL3Xh2ymbvRIUraxbJE+Y8dVGdic3T62Ac7RlNO2UIXL9bkArH7rA4T8cbzIK+K51xxnAQJ95o6rsivNj8MbFcrRa8VcCNYsUy2E9O_j0b63N0XmXr7UIo0m0ucsl2utwnOUxSqYK41lqZ1lBc+9_t67tlLHA_A5iuvuDleZHP2nsDWMDXxkNEpFwHEvEzz3Gi7gvw4K75sU6zTa88AIymFZsclVWgAvBC_J3CvKxLUVSdID32he5bAM2XCnwUjmXj4zK+qu1t6IQbqzNhaf7WrEz71G56RZOKJhDYLaWFJsrFNS2rmX1Aw2944jWsq8l9JYNmwLsKCSz72KwUOHEW2HqxyWIRvtlJJi7vVPaPGCmGDnzmJYjmzFnOJzb0BMOCo8F4lodBQjyWPxy4bPpcCq5hSee8NqsGndGo2NNppQcXw1H1gsZq1v+1TMXIcle3jTYC2otIPJFR0bkWgBc9p1qEheURO41ECs53VcE5HbszwQV0eSpi8itEOCG9RTiqqaJHChHeNB6P+6zS2tsf2FcdmP3zuhjR47HiqtE2swRD4S1_b_vUZAplfCGebO+lFcD1+rVMrRU4q9cGWRGhpRVJgYXA_XqLsTJ93Cc6mbLu2j6DWIxwDB+6WuibBQRQ1GyaQSB9aFqJDhZdB5uBaOdKyPvf+myxWpwtXGqAtV6pDYd7iW2bN5u1TSJyjhz_jF6UyBSnEff69Fexk0aQpf5WBqEptysdCqnANQis54+7cpTpQ2ZwAb8uM+n8O5Iy4mwJ3LidYfrd+Z1Eorw09SxGqLXQrFM6A9ecaja0GUpoW0cf48KYRHF02p95TUM3CIavkVsPR_hNr9zEAsm31mksjlSfXS_ak7lxOtvwLMxatUrvhW+gcsYkZ8tQzOnvEcYW2t7SL9tYOWaGT+AXWTLHyXDveSpOzjM5M8vL3dn1_icqL1929WMlsYL24bLy2_eWkLWBxA4I+nyzOLHzZUrtWT9Vz3_o5az3t5pH59ko_+NYqW1zG3g2Jupuoyy5l72tu8Pz_B5STnT6kEjAcebTtwrLQ8CKCmMyEdByvM++OpkkWhbUa3zHSkH9X6GsUge61NUacUDIVLpux53fbb60s1hH3QBkfaTe0TXB8uuz48uO4rAqVS3B9PFdXwAspG5aL411MPxlrbyRMb_oEzM8FbOwq0fpn9am4O9jlvT5X5AHpIE8eL6XgQibEid6YNyyqlKT+5wiXCcH261WQRHX0Lv7JDdHwF212confyQsqXfE9BOHtmuszckniguT0dPFX+IWkWFfzOR7I6Gq5HKgop3gGh3aWDnoc3S_RkiJQ_2IInVesYEE+sFoAPtfA8d30tiypdVMyN7Ng3l5nbDPTSaJmvX3cuJzp_mXr7XtWZvAiRjsj1CHA9QXrBkOL0uIYs0YT0p__ytP8qAaaXKlawY5qrn6+DPgRQcaDRjJ2TKTEm1HzwunE5Efnz7i74O8oRuELM7fSRo+An09UQ5YnmsiP9cchM_eaKYo7GA6fDHPTrjhxmtLsotNDdEik3GTVnZTtly+solNyYSZr1TvfmiVxORP7o3l9omlB1vCAZGCTc4MXMluUSerDE1VzOMsE4mMhRgH_oo51nR5_RJkfrVYB6J0+hSjbL60jJreKKATYn7zuRp9AGoOXrFoQgKwdt4wGqsHjOnNIDnQvV54L6o6b8uTjMHXOxgkVP+v57dTFCat8Wuhakk7m43HsPOpJiaklvC+Zkf5_za4fylJhN0CZeVu4C7jPXi7EaHoCIRKBo0oDspU+SkvKX_g7pXfN4rvP0iIC9pbpDCTAj7GsGSd5SvOqHysm+zB3L06mepqk9PJNRI3+9vroHGuKcqf11OZjJSvnzQU7zEhH1DHIRagnL0f1NQWULRE5UjcXO5CkiGkOCR1JkUh4OI9gDNXDcSb_iOnP3AHftrUWO+9MR9vIFPS+370IKd4+INLRAWZW_hygiJ8+5NNq4PDWlT8QpDdDeJtgDhXgMd57pOLSnL5tjgvtjVhz1js_emb_W2w++OumAeWrfPpGeDsnqCmfLgxgNXgLFDqrW4kMG0ob2d2KKzqvzjsf8xrWws_36tME8NZZPtRd7NOEKTzgQjoKJpMhn4FfEwNCSpdtOugZIgJwwTws_hEnLXU3IrncUVU2WVUd13KkwBzHe9ZHK_Qq0pJtLGLfv8GT+2V48hcrJ+87l6UzDjOnurXcS0zQbNUDWJJbXBAefsJa+Yeb3g8kJ7C+dTy+gz+GojvKKt+6g9GVrMYF1FIisv499Y_IWxp9aDf_tp2r4qD8BUIsP5xGxrL8cMR80n3dI67xDnchwEgNa3jS9BBqa_qD4ivRlDZ1lF0mW7HziYr1_SWO5nKj8NaQnky30ranl_GHXHWwIuJwI_TlvZGlLwOWE8qf5oLZbaKCwP1K2G+PFYqloUHi9F7e8JuGOM4H7cDW4NiAPNHjlWcI9akt0zTuDcKjdHHjyhZhcgqKmwS3PEm6q3R548gUrl2hLoW55lnB7YOuQBm2DaDizAXuw_iwrNBI0sO1Ga55QhBffhPofViGq91mG4FJb4DCCa9yHjOZS281IsjhyiZYjCl55lnCH2ja48oWwXMIpbzNlM425SWguEXLYcQvhSh0gxcT9990ixZuCN9N06zXIpgLPBSAPU+0WBn4nIeW3K5nUN6sor3izodocJ33VJP4RvB9zLCd1HUVmqwIO_yLERY+GDUWOEqpPkuRhkHedMXOuJq6d1KpAfLuOzxVw0avb5oLyg2TPM7qNxrjo1S23FdSdrEyqnQn85r_8m2eymF42E3OrnNWVy8DbPsNH22pfmO9xIi94NJDaNvX3JT03uyU='.replace(/_/g, '/');
  const F = {};
  'bg_fonda,0,0,300,112;bg_plaza,0,112,300,112;bg_puente,0,224,300,112;bg_ruta,0,336,300,112;bg_vega,0,448,300,112;boss1,300,448,96,96;f_road,0,560,200,80;c_critico,200,560,64,80;kiosk,264,560,35,75;f_mnt,0,640,400,70;c_tio,400,640,48,60;c_tokan,448,640,48,60;ch_crouch,0,710,48,60;ch_hit,48,710,48,60;ch_idle,96,710,48,60;ch_jump,144,710,48,60;ch_run1,192,710,48,60;ch_run2,240,710,48,60;ch_run3,288,710,48,60;ch_run4,336,710,48,60;ch_shoot,384,710,48,60;ch_up,432,710,48,60;bot_fire,0,770,40,44;bot_w1,40,770,40,44;bot_w2,80,770,40,44;o_shield,120,770,8,30;crate,128,770,30,25;trk,158,770,36,24;dron1,194,770,40,22;dron2,234,770,40,22;vol,274,770,16,20;o_esc,290,770,14,20;qlad,304,770,28,16;chancho,332,770,32,15;quiltro,364,770,28,15;roof,392,770,80,14;brl,472,770,14,14;o_mz,486,770,13,10;o_fl,499,770,10,10;coin,0,814,9,9;o_pb,9,814,9,9;o_emp,18,814,12,8;o_viga,30,814,40,7;o_eb,70,814,7,7;o_mb,77,814,9,6;o_gb,86,814,6,6'.split(';').e((t) => { const a = t.split(','); F[a[0]] = a.slice(1).map(Number); });

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
      s.add.rectangle(400, 300, W, H, INK, 0.3);
      tx(s, 400, 120, 'WELCOMBATE', 96, TY).J(TI, 14);
      s.m = tx(s, 400, 230, '', 22, TW); s.md = tx(s, 400, 268, '', 22, TY);
      s.c1 = im(s, 330, 520, 'ch_idle').K(3).O(0.5, 1);
      s.c2 = s.add.image(470, 520, 'a2', 'ch_idle').K(3).O(0.5, 1).X(true);
      s.st = tx(s, 400, 566, 'START', 30, TW);
      s.draw = () => { s.m.T(G.two ? '▲ 2 JUGADORES ▼' : '▲ 1 JUGADOR ▼'); s.md.T(G.prac ? '◀ PRÁCTICA ▶' : '◀ ARCADE ▶'); s.c2.V(!!G.two); };
      s.draw();
    },
    update(t, dt) {
      const s = this; s.par(t * 0.08); s.st.V(t % 800 < 520);
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
      b: ['LA GRAN CAJA', 'boss1', 2.4, 0], t: 'Se tomaron La Vega.\nSuelta a los caseros y ojo con los quiltros,\nque te roban las lucas.' },
    { c: 'TALCA', n: 'LA CATEDRAL', L: 800, sky: [BL, CE, PA, KR], mid: ['bg_plaza'], z: ['LA CATEDRAL'],
      wv: [[60, 'j', 0], [330, 'jd', 0], [660, 'j', 0], [990, 'jj', 0], [1320, 'jd', 0], [1650, 'jj', 0]],
      cr: [], rf: [], ki: [700],
      ho: [[400, GY - 660, 'c_tokan', '¡Al tiro!'], [300, GY - 1320, 'c_tio', '¡Lo de siempre, cabros!']],
      b: ['QUILTRO MECÁNICO', 'quiltro', 4, 0x9a9a9a], t: 'El Quiltro está arriba de la torre.\nSe sube por las escaleras (↑) y van cayendo\nbarriles de palta: salta o dispara.' },
    { c: 'CHILLÁN', n: 'RUTA 5 SUR', L: 12000, sky: [CE, PA, YE, CO], mid: ['bg_ruta', 'bg_ruta', 'bg_ruta', 'bg_plaza', 'bg_ruta', 'bg_ruta', 'bg_puente', 'bg_ruta'], z: ['RUTA 5 SUR'],
      wv: [[300, 'vr', 0], [1100, 'cc', 0], [1800, 'vd', 0], [2600, 'rcv', 0], [3400, 'vv', 0], [4200, 'ccr', 0], [5000, 'vdv', 0], [5800, 'rrc', 0], [6600, 'vvd', 0], [7300, 'cvrv', 0], [8100, 'rvd', 0], [8900, 'ccvv', 0], [9700, 'vrvd', 0], [10500, 'cvvr', 0]],
      cr: [], rf: [], ki: [], ho: [],
      b: ['CHANCHO BLINDADO', 'chancho', 5, 0xb0b0b0], t: 'Al truck se le cortaron los frenos.\n→ acelera, ← aguanta y dispara pa atrás.\nCuidado con los furgones y los barriles.' },
    { c: 'FONDA', n: 'TIRO AL BLANCO', L: 800, sky: [BLK, BD, P2C, TE], night: 1, mid: ['bg_fonda'], z: ['FONDA LA WELCOME'],
      wv: [[60, 'bb', 0], [90, 'bkp', 0], [120, 'bbb', 0], [150, 'bkkd', 0], [180, 'bbbp', 0], [210, 'bbkkd', 0], [240, 'bbbbkp', 0]],
      cr: [[370, 1]], rf: [], ki: [700], ho: [],
      b: ['EL CRÍTICO', 'boss1', 2.4, 0xc9a0ff], t: 'Última parada: la fonda.\nEl joystick mueve la mira, B1 dispara y\nB2 salta. A la pareja de cueca, no.' },
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
        cF = s.add.text(400, 400, 'START: vamos', ts(20)).O(0.5)]);
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
              E.e((e) => { if (ab(e.x - p.cx) < R && ab((e.bot ? e.y - 35 : e.k === 'p' ? e.y - 44 : e.y) - p.cy) < R + 10) { if (e.k === 'p') { G.score[p.i] = mx(0, G.score[p.i] - 100); shout('¡A LA CUECA NO! -100', TC, 700); } else { e.hp -= d; e.hitT = 0.05; e.by = p.i; } } });
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
                if (e.k === 'p') { G.score[o.own] = mx(0, G.score[o.own] - 100); shout('¡A LA CUECA NO! -100', TC, 700); gone = 1; break; }
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

  // --- Fin + ranking con iniciales ---
  const Over = {
    key: 'O',
    create() {
      const s = this, tot = G.score[0] + G.score[1]; flush();
      s.cameras.main.setBackgroundColor(PA);
      s.n = [0, 0, 0]; s.i = tot > 0 && !G.prac ? 0 : 3; s.v = []; s.tot = tot;
      tx(s, 400, 60, G.win ? '¡MISIÓN CUMPLIDA!' : 'FIN DEL JUEGO', 46, TY).J(TI, 8);
      tx(s, 400, 116, 'puntaje: ' + tot + (G.prac ? ' (práctica: no válido)' : ''), 18, TI).J(TW, 0);
      const ti = tx(s, 400, 172, '', 40, TI).J(TW, 0);
      tx(s, 400, 214, '↑ ↓ letra · B1 siguiente · START menú', 12, '#6e6a5e').J(TW, 0);
      s.add.rectangle(400, 400, 306, 306, INK); s.add.rectangle(400, 400, 300, 300, WH); s.add.rectangle(400, 264, 300, 28, BLK);
      tx(s, 262, 264, 'welcome back · top 10', 13, TW, 0).J('#171717', 0);
      const tl = s.add.text(270, 288, '', ts(15, TI, { lineSpacing: 8 }));
      s.dr = () => {
        ti.T(s.i < 3 ? s.n.map((c, i) => (i === s.i ? '[' : ' ') + String.fromCharCode(65 + c) + (i === s.i ? ']' : ' ')).join('') : '');
        tl.T(s.v.map((x, i) => String(i + 1).padStart(2) + '. ' + x.n.slice(0, 3) + '  ' + String(x.s).padStart(8)).join('\n'));
      };
      load().then((v) => { s.v = v; s.dr(); });
    },
    update() {
      const s = this, d = h2('D') - h2('U');
      if (s.i > 2) { if (h2('S')) s.scene.start('M'); return; }
      if (d) { s.n[s.i] = (s.n[s.i] + d + 26) % 26; tone(520, 0.04); }
      if (h2('1') && ++s.i > 2) { s.v.push({ n: s.n.map((c) => String.fromCharCode(65 + c)).join(''), s: s.tot }); s.v.sort((a, b) => b.s - a.s); s.v = s.v.slice(0, 10); save(s.v); ding(); flush(); }
      s.dr();
    },
  };
  new Phaser.Game({
    type: Phaser.AUTO, width: W, height: H, parent: 'game-root', backgroundColor: '#1f81a6',
    pixelArt: true, roundPixels: true,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [Boot, Menu, Map, Play, Over],
  });
})();
